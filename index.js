import "dotenv/config";

import * as lib from "./lib.js";

import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

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

// urls.forEach(async (url) => {
//   const result = await firecrawl.scrapeUrl(url, {
//     formats: ["markdown"],
//   });

//   if (result.success) {
//     const fileName = lib.extractFileNameFromUrl(url);
//     lib.saveFile(fileName, result.markdown ?? "");
//   }
// });
