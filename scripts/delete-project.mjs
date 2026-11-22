import { access, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const projectsDirectory = path.resolve("app/project/_projects");
const registryPath = path.resolve(
  "app/project/[projectCode]/_data/projectRegistry.ts",
);

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

function removeFromRegistry(registrySource, projectCode) {
  const configVariable = `${lowerFirst(projectCode)}Config`;
  const lineEnding = registrySource.includes("\r\n") ? "\r\n" : "\n";

  const importStatement = `import { ${configVariable} } from "../../_projects/${projectCode}/config";`;
  const registryEntry = `  ${projectCode}: ${configVariable},`;

  if (
    !registrySource.includes(importStatement) ||
    !registrySource.includes(registryEntry)
  ) {
    throw new Error(`${projectCode} 不存在於 projectRegistry。`);
  }

  const registryWithoutProject = registrySource
    .replace(`${importStatement}${lineEnding}`, "")
    .replace(`${registryEntry}${lineEnding}`, "");

  const orderStartMarker = "export const projectOrder = [";
  const orderEndMarker = "] as const satisfies readonly ProjectCode[];";
  const orderStart = registryWithoutProject.indexOf(orderStartMarker);
  const orderEnd = registryWithoutProject.indexOf(orderEndMarker, orderStart);

  if (orderStart === -1 || orderEnd === -1) {
    throw new Error("找不到 projectOrder 預期結構。");
  }

  const orderBlock = registryWithoutProject.slice(
    orderStart,
    orderEnd + orderEndMarker.length,
  );
  const orderLines = orderBlock.split(lineEnding);
  const projectOrderEntry = `"${projectCode}"`;
  const updatedOrderLines = orderLines.filter((line) => {
    const entry = line.trim().replace(/,$/, "");
    return entry !== projectOrderEntry;
  });

  return registryWithoutProject.replace(
    orderBlock,
    updatedOrderLines.join(lineEnding),
  );
}

const readline = createInterface({ input: stdin, output: stdout });

async function getProjectCodes() {
  const entries = await readdir(projectsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((first, second) => first.localeCompare(second));
}

try {
  const projectCodes = await getProjectCodes();

  if (projectCodes.length === 0) {
    throw new Error("目前沒有可刪除的建案。");
  }

  console.log("\n請選擇要刪除的建案：");
  projectCodes.forEach((projectCode, index) => {
    console.log(`${index + 1}. ${projectCode}`);
  });

  const answer = await readline.question(
    `\n請輸入選項編號 (1-${projectCodes.length}): `,
  );
  const projectCode = projectCodes[Number(answer) - 1];

  if (!projectCode) {
    throw new Error(`選項無效，請輸入 1 到 ${projectCodes.length}。`);
  }

  const targetDirectory = path.join(projectsDirectory, projectCode);

  if (!(await pathExists(targetDirectory))) {
    throw new Error(`找不到建案資料夾：${targetDirectory}`);
  }

  const confirm = await readline.question(
    `確定刪除 ${projectCode} 及其 registry 設定？輸入 yes 繼續：`,
  );

  if (confirm !== "yes") {
    console.log("已取消刪除。");
    process.exitCode = 0;
  } else {
    const originalRegistry = await readFile(registryPath, "utf8");
    const nextRegistry = removeFromRegistry(originalRegistry, projectCode);

    await writeFile(registryPath, nextRegistry, "utf8");

    try {
      await rm(targetDirectory, { recursive: true, force: true });
    } catch (error) {
      // 資料夾刪除失敗時，還原 registry。
      await writeFile(registryPath, originalRegistry, "utf8");
      throw error;
    }

    console.log(`已刪除 ${projectCode}。`);
  }
} catch (error) {
  console.error(`刪除失敗：${error.message}`);
  process.exitCode = 1;
} finally {
  readline.close();
}
