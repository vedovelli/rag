import "dotenv/config";

import * as lib from "./lib.js";

const urls = [
  "https://www.rocketseat.com.br/blog/artigos/post/componentes-reutilizaveis-react-2025",
  "https://www.rocketseat.com.br/blog/artigos/post/ingles-lideranca-tecnica-global",
  "https://www.rocketseat.com.br/blog/artigos/post/automatize-tarefas-n8n-docker",
  "https://www.rocketseat.com.br/blog/artigos/post/como-estudar-programacao-eficiente",
  "https://www.rocketseat.com.br/blog/artigos/post/carreira-em-tecnologia-sem-sobrecarga",
  "https://www.rocketseat.com.br/blog/artigos/post/controles-de-acesso-swift",
  "https://www.rocketseat.com.br/blog/artigos/post/zod-v4-novidades-e-performance-turbinada",
  "https://www.rocketseat.com.br/blog/artigos/post/profissionais-360-ti-empresas-alta-performance",
  "https://www.rocketseat.com.br/blog/artigos/post/swift-tuplas-codigo-limpo",
  "https://www.rocketseat.com.br/blog/artigos/post/profissional-360-acelerar-desenvolvimento",
];

const title = "Validação de dados descomplicada";

const embeddings = await lib.getEmbeddings([title]);

const sql = `SELECT 
  c.id,
  c.url,
  (1 - vector_distance_cos(c.embedding, ?)) as similarity_score
FROM content c
WHERE similarity_score > 0.4
ORDER BY similarity_score DESC
LIMIT 3`;

const result = await lib.turso.execute(sql, [
  JSON.stringify(embeddings[0].embeddings),
]);

console.log(
  result.rows.map((row) => ({
    url: row.url,
    similarity_score: `${Math.ceil(row.similarity_score * 100)}%`,
  }))
);

// urls.forEach(async (url) => {
//   const fileName = lib.extractFileNameFromUrl(url);
//   const markdownContents = lib.readFile(fileName);
//   const chunks = await lib.extractChunks(markdownContents);
//   const embeddings = await lib.getEmbeddings(chunks);

//   embeddings.forEach(async (item) => {
//     await lib.turso.execute(
//       "INSERT INTO content (content, url, embedding) VALUES (?,?,?)",
//       [item.chunk, url, JSON.stringify(item.embeddings)]
//     );
//   });
// });

function getContents(urls) {
  urls.forEach(async (url) => {
    const result = await lib.firecrawl.scrapeUrl(url, {
      formats: ["markdown"],
    });

    if (result.success) {
      const fileName = lib.extractFileNameFromUrl(url);
      lib.saveFile(fileName, result.markdown ?? "");
    }
  });
}
