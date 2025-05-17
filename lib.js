import { readFileSync, writeFileSync } from "fs";

import path from "path";

export function readFiles(fileNames) {
  return fileNames.map(readFile);
}

export function readFile(fileName) {
  return readFileSync(`${getContentDirPath()}/${fileName}`, "utf-8");
}

export async function saveFile(fileName, content) {
  writeFileSync(`${getContentDirPath()}/${fileName}`, content);
}

export function getContentDirPath() {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, "content");
}

export function extractFileNameFromUrl(url) {
  const parts = url.split("/");
  return `${parts[parts.length - 1]}.md`;
}
