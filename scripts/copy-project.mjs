import { access, cp, readFile, rm, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const projectOptions = [
  { label: "青喆 SOHO", folder: "ChingJe" },
  { label: "華山藝邸", folder: "HuaShan" },
  { label: "敦南 SOHO", folder: "DuenNan" },
  { label: "台中 One Park", folder: "OnePark" },
  { label: "宜蘭光御墅", folder: "LightImperial" },
];

const projectTypeOptions = ["自地自建", "全案委託管理", "危老重建"];

const projectsDirectory = path.resolve("app/project/_projects");
const registryPath = path.resolve(
  "app/project/[projectCode]/_data/projectRegistry.ts",
);

const defaultGoogleMapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.1694123300445!2d121.54660570901761!3d25.028324177727544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aa329779a7c5%3A0xfc4f7970081f154a!2z5YWJ6ZqG5a-m5qWt6IKh5Lu95pyJ6ZmQ5YWs5Y-4!5e0!3m2!1sen!2stw!4v1788850904652!5m2!1sen!2stw";

function lowerFirst(value) {
  return value.slice(0, 1).toLowerCase() + value.slice(1);
}

async function pathExists(targetPath) {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function updateConfig(configSource, projectCode, projectType) {
  const configVariable = `${lowerFirst(projectCode)}Config`;

  return configSource
    .replace(
      /export const \w+ =/,
      `export const ${configVariable} =`,
    )
    .replace(
      /name:\s*"[^"]*"/,
      'name: "請輸入新建案名稱"',
    )
    .replace(
      /type:\s*"[^"]*"/,
      `type: "${projectType}"`,
    )
    .replace(
      /googleMapSrc:\s*"[^"]*"/,
      `googleMapSrc: "${defaultGoogleMapSrc}"`,
    );
}

function updateProjectDetail(dataSource) {
  return dataSource.replace(
    /value:\s*"[^"]*"/g,
    'value: "請輸入新建案內容"',
  );
}

function updateRegistry(registrySource, projectCode) {
  const configVariable = `${lowerFirst(projectCode)}Config`;
  const importStatement =
    `import { ${configVariable} } from "../../_projects/${projectCode}/config";`;

  if (registrySource.includes(`_projects/${projectCode}/config`)) {
    throw new Error(`projectRegistry 已經包含 ${projectCode}。`);
  }

  // 保留來源檔案的換行格式，Windows 為 CRLF，其他環境可為 LF。
  const lineEnding = registrySource.includes("\r\n") ? "\r\n" : "\n";
  const importMarker =
    `${lineEnding}${lineEnding}export const projectRegistry = {`;
  const registryEndMarker = `${lineEnding}} as const;`;

  const importEnd = registrySource.lastIndexOf(importMarker);
  const registryEnd = registrySource.indexOf(registryEndMarker);

  if (importEnd === -1 || registryEnd === -1) {
    throw new Error("找不到 projectRegistry 預期的 import 或 registry 結構。");
  }

  const withImport =
    registrySource.slice(0, importEnd) +
    `${lineEnding}${importStatement}` +
    registrySource.slice(importEnd);

  const updatedRegistryEnd = withImport.indexOf(registryEndMarker);

  const withRegistryEntry =
    withImport.slice(0, updatedRegistryEnd) +
    `${lineEnding}  ${projectCode}: ${configVariable},` +
    withImport.slice(updatedRegistryEnd);

  const orderStartMarker = "export const projectOrder = [";
  const orderEndMarker = "] as const satisfies readonly ProjectCode[];";
  const orderStart = withRegistryEntry.indexOf(orderStartMarker);
  const orderEnd = withRegistryEntry.indexOf(orderEndMarker, orderStart);

  if (orderStart === -1 || orderEnd === -1) {
    throw new Error("找不到 projectOrder 預期結構。");
  }

  const orderBodyStart = orderStart + orderStartMarker.length;
  const orderLines = withRegistryEntry
    .slice(orderBodyStart, orderEnd)
    .split(lineEnding);
  const lastOrderLineIndex = orderLines.findLastIndex(
    (line) => line.trim() !== "",
  );

  if (lastOrderLineIndex === -1) {
    throw new Error("projectOrder 沒有可供追加的項目。");
  }

  const newOrderEntry = `"${projectCode}"`;
  if (
    orderLines.some((line) => {
      const entry = line.trim().replace(/,$/, "");
      return entry === newOrderEntry;
    })
  ) {
    throw new Error(`projectOrder 已經包含 ${projectCode}。`);
  }

  if (!orderLines[lastOrderLineIndex].trimEnd().endsWith(",")) {
    orderLines[lastOrderLineIndex] += ",";
  }
  orderLines.splice(lastOrderLineIndex + 1, 0, `  "${projectCode}",`);

  return (
    withRegistryEntry.slice(0, orderBodyStart) +
    orderLines.join(lineEnding) +
    withRegistryEntry.slice(orderEnd)
  );
}

const readline = createInterface({ input: stdin, output: stdout });

let targetDirectory;
let originalRegistrySource;
let copiedTargetDirectory = false;
let registryWriteStarted = false;

try {
  console.log("\n請選擇要複製的建案：");
  projectOptions.forEach((project, index) => {
    console.log(`${index + 1}. ${project.label} (${project.folder})`);
  });

  const answer = await readline.question("\n請輸入選項編號 (1-5): ");
  const sourceProject = projectOptions[Number(answer) - 1];

  if (!sourceProject) {
    throw new Error("選項無效，請輸入 1 到 5。");
  }

  const projectCode = await readline.question("請輸入新的 ProjectCode: ");

  if (!/^[A-Z][A-Za-z0-9]*$/.test(projectCode)) {
    throw new Error(
      "ProjectCode 必須是 PascalCase，例如 NewProject 或 HappyGarden。",
    );
  }

  console.log("\n請選擇建案類型：");
  projectTypeOptions.forEach((projectType, index) => {
    console.log(`${index + 1}. ${projectType}`);
  });

  const typeAnswer = await readline.question(
    `\n請輸入選項編號 (1-${projectTypeOptions.length}): `,
  );
  const projectType = projectTypeOptions[Number(typeAnswer) - 1];

  if (!projectType) {
    throw new Error(
      `建案類型選項無效，請輸入 1 到 ${projectTypeOptions.length}。`,
    );
  }

  const sourceDirectory = path.join(projectsDirectory, sourceProject.folder);
  targetDirectory = path.join(projectsDirectory, projectCode);

  if (await pathExists(targetDirectory)) {
    throw new Error(`目標資料夾已存在：${targetDirectory}`);
  }

  // 在寫入前預先讀取並產生所有內容。這些步驟失敗時不會留下檔案異動。
  const sourceConfigPath = path.join(sourceDirectory, "config.ts");
  const sourceDataPath = path.join(sourceDirectory, "data.tsx");

  const [sourceConfig, sourceData, registrySource] = await Promise.all([
    readFile(sourceConfigPath, "utf8"),
    readFile(sourceDataPath, "utf8"),
    readFile(registryPath, "utf8"),
  ]);

  originalRegistrySource = registrySource;

  const nextConfig = updateConfig(sourceConfig, projectCode, projectType);
  const nextData = updateProjectDetail(sourceData);
  const nextRegistry = updateRegistry(registrySource, projectCode);

  await cp(sourceDirectory, targetDirectory, {
    recursive: true,
    errorOnExist: true,
  });
  copiedTargetDirectory = true;

  await writeFile(
    path.join(targetDirectory, "config.ts"),
    nextConfig,
    "utf8",
  );
  await writeFile(
    path.join(targetDirectory, "data.tsx"),
    nextData,
    "utf8",
  );

  // 先標記再寫入：writeFile 若中途失敗，仍嘗試以原文還原。
  registryWriteStarted = true;
  await writeFile(registryPath, nextRegistry, "utf8");

  console.log(`\n已建立 ${projectCode}。`);
  console.log(`路由：/project/${projectCode}`);
} catch (error) {
  const rollbackErrors = [];

  if (registryWriteStarted && originalRegistrySource !== undefined) {
    try {
      await writeFile(registryPath, originalRegistrySource, "utf8");
    } catch (rollbackError) {
      rollbackErrors.push(`registry 還原失敗：${rollbackError.message}`);
    }
  }

  if (copiedTargetDirectory && targetDirectory) {
    try {
      await rm(targetDirectory, { recursive: true, force: true });
    } catch (rollbackError) {
      rollbackErrors.push(`新建案資料夾刪除失敗：${rollbackError.message}`);
    }
  }

  console.error(`\n建立失敗：${error.message}`);

  if (rollbackErrors.length === 0) {
    console.error("本次指令的異動已回滾。");
  } else {
    console.error(`回滾未完全成功：${rollbackErrors.join("；")}`);
  }

  process.exitCode = 1;
} finally {
  readline.close();
}