[CmdletBinding()]
param(
    [ValidateSet('Test', 'Production')]
    [string]$Environment = 'Test',
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$targetConfig = switch ($Environment) {
    'Test' {
        @{
            SiteName = 'KLTown-Test'
            SiteUrl = 'http://TP-EIP/KLTown-Test/'
            BasePath = ''
            Confirmation = 'MIRROR'
            PreserveExtraFiles = $false
        }
    }
    'Production' {
        @{
            SiteName = 'KLTown'
            SiteUrl = 'https://www.kltown.com/'
            BasePath = ''
            Confirmation = 'DEPLOY KLTOWN'
            PreserveExtraFiles = $false
        }
    }
}

$siteName = $targetConfig.SiteName
$env:NEXT_PUBLIC_BASE_PATH = $targetConfig.BasePath
$serviceUrl = "https://TP-EIP:8172/msdeploy.axd?site=$siteName"
$deploymentAssemblyPath = Join-Path $env:ProgramFiles 'IIS\Microsoft Web Deploy V3\Microsoft.Web.Deployment.dll'
$sourcePath = Join-Path $PSScriptRoot 'out'

if (-not (Test-Path $deploymentAssemblyPath)) {
    throw "Web Deploy API was not found at '$deploymentAssemblyPath'. Install Web Deploy or update the path in deploy-test.ps1."
}

& npm.cmd run build
if ($LASTEXITCODE -ne 0) {
    throw "Build failed with exit code $LASTEXITCODE. Nothing was deployed."
}

if (-not (Test-Path (Join-Path $sourcePath 'index.html'))) {
    throw "Build output '$sourcePath\index.html' was not found."
}

if ($targetConfig.BasePath) {
    $assetPattern = '(?<delimiter>["''(])(?<asset>/(?:images|fonts|textures)/)'
    $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
    $rewrittenFiles = 0
    $textFiles = Get-ChildItem $sourcePath -Recurse -File | Where-Object { $_.Extension -in @('.html', '.txt', '.css', '.js') }

    foreach ($file in $textFiles) {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $updatedContent = [regex]::Replace($content, $assetPattern, {
            param($match)
            $match.Groups['delimiter'].Value + $targetConfig.BasePath + $match.Groups['asset'].Value
        })

        if ($updatedContent -cne $content) {
            [System.IO.File]::WriteAllText($file.FullName, $updatedContent, $utf8NoBom)
            $rewrittenFiles++
        }
    }

    Write-Host "Prefixed public asset paths in $rewrittenFiles exported files."
}

if (-not $DryRun) {
    if ($targetConfig.PreserveExtraFiles) {
        Write-Warning "Production deployment preserves files on the IIS site that are not in out\."
    } else {
        Write-Warning "Mirror deployment removes files on the IIS site that are not in out\."
    }
    Write-Host "Target: $($targetConfig.SiteUrl)"
    $confirmation = Read-Host "Type '$($targetConfig.Confirmation)' to continue"
    if ($confirmation -cne $targetConfig.Confirmation) {
        Write-Host 'Deployment cancelled.'
        exit 0
    }
}

$credential = Get-Credential -UserName "$env:USERDOMAIN\$env:USERNAME" -Message "Enter the AD credentials for IIS site '$siteName'."
if ($null -eq $credential) {
    throw 'Credential entry was cancelled. Nothing was deployed.'
}

[void][Reflection.Assembly]::LoadFrom($deploymentAssemblyPath)
Add-Type -ReferencedAssemblies @($deploymentAssemblyPath, [System.Xml.XPath.IXPathNavigable].Assembly.Location) -TypeDefinition @'
using System;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Web.Deployment;

public static class KLTownWebDeployCallbacks
{
    public static readonly EventHandler<DeploymentTraceEventArgs> TraceHandler = WriteTrace;
    public static readonly RemoteCertificateValidationCallback TestCertificateHandler = AcceptAnyCertificate;
    public static readonly RemoteCertificateValidationCallback ProductionCertificateHandler = AcceptAnyCertificate;

    private static void WriteTrace(object sender, DeploymentTraceEventArgs eventArgs)
    {
        string prefix;
        switch (eventArgs.EventLevel.ToString())
        {
            case "Error": prefix = "\u932F\u8AA4"; break;
            case "Warning": prefix = "\u8B66\u544A"; break;
            case "Info": prefix = "\u8CC7\u8A0A"; break;
            case "Verbose": prefix = "\u8A73\u7D30\u8CC7\u8A0A"; break;
            default: prefix = eventArgs.EventLevel.ToString(); break;
        }

        Console.WriteLine("{0}: {1}", prefix, eventArgs.Message);
    }

    public static string FormatSummary(int totalChanges, int added, int deleted, int updated, int parameterChanges, long bytesCopied)
    {
        return String.Format(
            "\u8B8A\u66F4\u7E3D\u8A08: {0} (\u65B0\u589E {1} \u6B21\u3001\u522A\u9664 {2} \u6B21\u3001\u66F4\u65B0 {3} \u6B21\u3001\u8B8A\u66F4 {4} \u500B\u53C3\u6578\u3001\u8907\u88FD {5} \u500B\u4F4D\u5143\u7D44)",
            totalChanges, added, deleted, updated, parameterChanges, bytesCopied);
    }

    private static bool AcceptAnyCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
    {
        return true;
    }

}
'@
$traceHandler = [KLTownWebDeployCallbacks]::TraceHandler
$sourceOptions = [Microsoft.Web.Deployment.DeploymentBaseOptions]::new()
$sourceOptions.TraceLevel = [System.Diagnostics.TraceLevel]::Info
$sourceOptions.add_Trace($traceHandler)
$sourceObject = [Microsoft.Web.Deployment.DeploymentManager]::CreateObject('contentPath', $sourcePath, $sourceOptions)
$destinationOptions = [Microsoft.Web.Deployment.DeploymentBaseOptions]::new()
$destinationOptions.TraceLevel = [System.Diagnostics.TraceLevel]::Info
$destinationOptions.add_Trace($traceHandler)
$destinationOptions.ComputerName = $serviceUrl
$destinationOptions.AuthenticationType = 'Basic'
$destinationOptions.UserName = $credential.UserName
$destinationOptions.Password = $credential.GetNetworkCredential().Password
$syncOptions = [Microsoft.Web.Deployment.DeploymentSyncOptions]::new()
$syncOptions.WhatIf = [bool]$DryRun
$syncOptions.DoNotDelete = $targetConfig.PreserveExtraFiles
$previousCertificateCallback = [System.Net.ServicePointManager]::ServerCertificateValidationCallback
$certificateCallback = if ($Environment -eq 'Production') {
    [KLTownWebDeployCallbacks]::ProductionCertificateHandler
} else {
    [KLTownWebDeployCallbacks]::TestCertificateHandler
}

try {
    [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $certificateCallback
    $summary = $sourceObject.SyncTo('contentPath', $siteName, $destinationOptions, $syncOptions)
} finally {
    [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $previousCertificateCallback
    $destinationOptions.Password = $null
    $credential = $null
    $sourceObject.Dispose()
}

if ($DryRun) {
    Write-Host 'Dry run completed.'
} else {
    Write-Host 'Deployment completed.'
}
Write-Host ([KLTownWebDeployCallbacks]::FormatSummary($summary.TotalChanges, $summary.ObjectsAdded, $summary.ObjectsDeleted, $summary.ObjectsUpdated, $summary.ParameterChanges, $summary.BytesCopied))
