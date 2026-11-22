import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const fontsDirectory = path.resolve("fonts");
const outputDirectory = path.resolve("public/fonts");
const supportedExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);
const textFilePattern = /^font-chars-(.+)\.txt$/i;

function runPyftsubset(fontPath, textFilePath, outputPath) {
  return new Promise((resolve, reject) => {
    const command = process.platform === "win32" ? "pyftsubset.exe" : "pyftsubset";
    const child = spawn(
      command,
      [
        fontPath,
        `--text-file=${textFilePath}`,
        `--output-file=${outputPath}`,
        "--layout-features=*",
        "--hinting",
      ],
      { stdio: "inherit" },
    );

    child.on("error", (error) => {
      if (error.code === "ENOENT") {
        reject(
          new Error(
            "找不到 pyftsubset，請先安裝 fonttools：pip install fonttools",
          ),
        );
        return;
      }

      reject(error);
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`pyftsubset 執行失敗，結束代碼：${code}`));
      }
    });
  });
}

try {
  const entries = await readdir(fontsDirectory, { withFileTypes: true });
  const textFiles = new Map();

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const match = entry.name.match(textFilePattern);
    if (match) textFiles.set(match[1].toLowerCase(), entry.name);
  }

  const fontFiles = entries.filter((entry) => {
    return entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase());
  });
  const pairs = fontFiles.flatMap((entry) => {
    const extension = path.extname(entry.name);
    const fontName = path.basename(entry.name, extension);
    const textFile = textFiles.get(fontName.toLowerCase());

    return textFile ? [{ fontFile: entry.name, fontName, extension, textFile }] : [];
  });

  if (pairs.length === 0) {
    throw new Error(
      "找不到可配對的檔案。文字檔請命名為 font-chars-[字體名稱].txt。",
    );
  }

  await mkdir(outputDirectory, { recursive: true });

  for (const pair of pairs) {
    const outputFile = `${pair.fontName}.subset${pair.extension.toLowerCase()}`;
    console.log(`\n轉換 ${pair.fontFile} -> ${outputFile}`);

    await runPyftsubset(
      path.join(fontsDirectory, pair.fontFile),
      path.join(fontsDirectory, pair.textFile),
      path.join(outputDirectory, outputFile),
    );
  }

  console.log(`\n完成，共產生 ${pairs.length} 個 subset 字型。`);
} catch (error) {
  console.error(`\n字型轉換失敗：${error.message}`);
  process.exitCode = 1;
}