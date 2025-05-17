import { readFileSync, writeFileSync } from "fs";

import FirecrawlApp from "@mendable/firecrawl-js";
import OpenAI from "openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@libsql/client";
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

export const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 768,
  chunkOverlap: 80,
});

export async function extractChunks(markdownContents) {
  return await splitter.splitText(markdownContents);
}

const openai = new OpenAI();

export async function getEmbeddings(chunks) {
  return Promise.all(
    chunks.map(async (chunk) => {
      const result = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
      });

      return {
        chunk,
        embeddings: result.data[0].embedding,
      };
    })
  );
}

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
