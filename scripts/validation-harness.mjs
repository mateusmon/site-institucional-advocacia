#!/usr/bin/env node

import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = path.join(rootDir, "reports", "validation-report.md");
const publicUrl = (process.env.VALIDATION_PUBLIC_URL ?? "https://ravanellierosenoadv.com.br").replace(/\/$/, "");
const port = Number(process.env.VALIDATION_PORT ?? 3100);
const suppliedBaseUrl = process.env.VALIDATION_BASE_URL?.replace(/\/$/, "");
const baseUrl = suppliedBaseUrl ?? `http://127.0.0.1:${port}`;
const skipBuild = process.argv.includes("--skip-build");

const routes = [
  "/",
  "/escritorio",
  "/areas-de-atuacao",
  "/equipe",
  "/conteudos",
  "/contato",
  "/seguranca-e-prevencao-a-fraudes",
];

const results = [];
const warnings = [];
let productionServer;

function record(category, check, passed, details) {
  results.push({ category, check, passed, details });
  const marker = passed ? "PASS" : "FAIL";
  console.log(`[${marker}] ${category} — ${check}: ${details}`);
}

function warn(check, details) {
  warnings.push({ check, details });
  console.warn(`[WARN] ${check}: ${details}`);
}

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function attributes(tag) {
  const parsed = {};
  const expression = /([:@\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;

  while ((match = expression.exec(tag))) {
    parsed[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  }

  return parsed;
}

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
}

function metaContent(html, attributeName, attributeValue) {
  const targetName = attributeName.toLowerCase();
  const targetValue = attributeValue.toLowerCase();

  for (const tag of tags(html, "meta")) {
    const attrs = attributes(tag);
    if (attrs[targetName]?.toLowerCase() === targetValue) return attrs.content ?? "";
  }

  return "";
}

function linkHref(html, relation) {
  for (const tag of tags(html, "link")) {
    const attrs = attributes(tag);
    if ((attrs.rel ?? "").split(/\s+/).includes(relation)) return attrs.href ?? "";
  }

  return "";
}

function textBetween(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return decodeHtml(match?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "");
}

function canonicalFor(route) {
  return route === "/" ? publicUrl : `${publicUrl}${route}`;
}

async function runNodeCommand(check, relativeBinary, args) {
  const binary = path.join(rootDir, relativeBinary);
  const startedAt = Date.now();

  const exitCode = await new Promise((resolve) => {
    const child = spawn(process.execPath, [binary, ...args], {
      cwd: rootDir,
      env: process.env,
      stdio: "inherit",
    });

    child.on("error", () => resolve(-1));
    child.on("exit", (code) => resolve(code ?? -1));
  });

  const duration = ((Date.now() - startedAt) / 1000).toFixed(1);
  record("Código", check, exitCode === 0, `código ${exitCode}; ${duration}s`);
  return exitCode === 0;
}

async function startProductionServer() {
  let output = "";
  productionServer = spawn(
    process.execPath,
    [path.join(rootDir, "node_modules/next/dist/bin/next"), "start", "-H", "127.0.0.1", "-p", String(port)],
    {
      cwd: rootDir,
      env: { ...process.env, NODE_ENV: "production" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  productionServer.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  productionServer.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (productionServer.exitCode !== null) break;
    try {
      const response = await fetch(`${baseUrl}/`, { redirect: "manual" });
      if (response.status < 500) {
        record("Servidor", "Servidor de produção", true, `${baseUrl} disponível`);
        return true;
      }
    } catch {
      // O servidor ainda está iniciando.
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  record("Servidor", "Servidor de produção", false, output.trim().slice(-600) || "não iniciou em 30s");
  return false;
}

async function stopProductionServer() {
  if (!productionServer || productionServer.exitCode !== null) return;

  productionServer.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => productionServer.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);

  if (productionServer.exitCode === null) productionServer.kill("SIGKILL");
}

async function request(route, options = {}) {
  const startedAt = performance.now();
  const response = await fetch(`${baseUrl}${route}`, {
    redirect: "manual",
    ...options,
  });
  const body = await response.text();
  return {
    body,
    duration: performance.now() - startedAt,
    headers: response.headers,
    status: response.status,
  };
}

function extractJsonLd(html) {
  const values = [];
  const expression = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = expression.exec(html))) {
    try {
      values.push(JSON.parse(decodeHtml(match[1])));
    } catch {
      values.push({ __invalid: true });
    }
  }

  return values;
}

function jsonLdTypes(values) {
  return values.flatMap((value) => {
    if (!value || typeof value !== "object") return [];
    const type = value["@type"];
    return Array.isArray(type) ? type : type ? [type] : [];
  });
}

async function validateHttp() {
  const pages = new Map();
  const titles = new Map();
  const descriptions = new Map();
  const internalPaths = new Set();
  const imagePaths = new Set();

  await request("/");

  for (const route of routes) {
    let page;
    try {
      page = await request(route);
    } catch (error) {
      record("Rotas", route, false, error.message);
      continue;
    }

    pages.set(route, page);
    const html = page.body;
    const title = textBetween(html, "title");
    const description = metaContent(html, "name", "description");
    const canonical = linkHref(html, "canonical");
    const mainCount = tags(html, "main").length;
    const h1Count = tags(html, "h1").length;
    const jsonLd = extractJsonLd(html);
    const types = jsonLdTypes(jsonLd);
    const htmlBytes = Buffer.byteLength(html);

    record("Rotas", route, page.status === 200, `HTTP ${page.status}`);
    record("Semântica", `${route} — main`, mainCount === 1, `${mainCount} elemento(s)`);
    record("Semântica", `${route} — h1`, h1Count === 1, `${h1Count} elemento(s)`);
    record("Semântica", `${route} — alvo principal`, /<main\b[^>]*id=["']main-content["']/i.test(html), "#main-content presente");
    record("Acessibilidade", `${route} — idioma`, /<html\b[^>]*lang=["']pt-BR["']/i.test(html), "lang pt-BR");
    record("Acessibilidade", `${route} — skip link`, /<a\b[^>]*href=["']#main-content["']/i.test(html), "link de salto presente");
    record("Acessibilidade", `${route} — conteúdo sem hidratação`, !/style=["'][^"']*opacity:\s*0(?:[;"'])/i.test(html), "HTML pré-renderizado nasce visível");

    const imageTags = tags(html, "img");
    const imagesWithAlt = imageTags.filter((tag) => Object.hasOwn(attributes(tag), "alt")).length;
    record("Acessibilidade", `${route} — textos alternativos`, imagesWithAlt === imageTags.length, `${imagesWithAlt}/${imageTags.length} imagens com alt`);

    record("SEO", `${route} — título`, title.length >= 15 && title.length <= 80, `${title.length} caracteres: ${title}`);
    record("SEO", `${route} — descrição`, description.length >= 80 && description.length <= 160, `${description.length} caracteres`);
    record("SEO", `${route} — canonical`, canonical === canonicalFor(route), canonical || "ausente");
    const openGraphComplete = Boolean(
      metaContent(html, "property", "og:title") &&
      metaContent(html, "property", "og:description") &&
      metaContent(html, "property", "og:image") &&
      metaContent(html, "property", "og:url") === canonicalFor(route)
    );
    const twitterComplete = Boolean(
      metaContent(html, "name", "twitter:card") === "summary_large_image" &&
      metaContent(html, "name", "twitter:title") &&
      metaContent(html, "name", "twitter:description") &&
      metaContent(html, "name", "twitter:image")
    );
    record("SEO", `${route} — Open Graph`, openGraphComplete, "title, description, url e image");
    record("SEO", `${route} — Twitter Card`, twitterComplete, metaContent(html, "name", "twitter:card") || "ausente");
    const robotsDirective = metaContent(html, "name", "robots").toLowerCase();
    record("SEO", `${route} — indexação`, !robotsDirective.includes("noindex") && !robotsDirective.includes("nofollow"), robotsDirective || "diretiva padrão");
    record("Dados estruturados", `${route} — JSON válido`, jsonLd.length > 0 && jsonLd.every((value) => !value.__invalid), `${jsonLd.length} bloco(s)`);
    record("Dados estruturados", `${route} — LegalService`, types.includes("LegalService"), types.join(", ") || "tipo ausente");
    if (route === "/") record("Dados estruturados", "Home — FAQPage", types.includes("FAQPage"), types.join(", "));
    record("Performance", `${route} — HTML`, htmlBytes <= 220 * 1024, `${(htmlBytes / 1024).toFixed(1)} KiB / 220 KiB`);

    if (page.duration > 1_000) warn(`${route} — resposta local`, `${page.duration.toFixed(0)}ms após aquecimento`);

    if (titles.has(title)) record("SEO", `${route} — título único`, false, `duplicado com ${titles.get(title)}`);
    else titles.set(title, route);

    if (descriptions.has(description)) record("SEO", `${route} — descrição única`, false, `duplicada com ${descriptions.get(description)}`);
    else descriptions.set(description, route);

    for (const anchor of tags(html, "a")) {
      const href = attributes(anchor).href;
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      const url = new URL(href, baseUrl);
      if (url.origin === new URL(baseUrl).origin) internalPaths.add(url.pathname);
    }

    for (const image of imageTags) {
      const src = attributes(image).src;
      if (src) imagePaths.add(src);
    }
  }

  const allHtml = [...pages.values()].map((page) => page.body).join("\n");
  record("Performance", "Sem PNGs pesados referenciados", !allHtml.includes("-enhanced.png"), "referências de produção usam WebP");

  for (const internalPath of [...internalPaths].sort()) {
    try {
      const response = await fetch(`${baseUrl}${internalPath}`, { redirect: "manual" });
      record("Navegação", internalPath, response.status < 400, `HTTP ${response.status}`);
    } catch (error) {
      record("Navegação", internalPath, false, error.message);
    }
  }

  for (const imagePath of [...imagePaths]) {
    try {
      const response = await fetch(new URL(decodeHtml(imagePath), baseUrl), {
        headers: { Accept: "image/avif,image/webp" },
      });
      const bytes = (await response.arrayBuffer()).byteLength;
      const contentType = response.headers.get("content-type") ?? "";
      record("Imagens", decodeHtml(imagePath).slice(0, 90), response.ok && contentType.startsWith("image/") && bytes <= 300 * 1024, `HTTP ${response.status}; ${contentType}; ${(bytes / 1024).toFixed(1)} KiB`);
    } catch (error) {
      record("Imagens", decodeHtml(imagePath).slice(0, 90), false, error.message);
    }
  }

  const homeHtml = pages.get("/")?.body ?? "";
  const scriptPaths = tags(homeHtml, "script")
    .map((tag) => attributes(tag))
    .filter((attrs) => !Object.hasOwn(attrs, "nomodule"))
    .map((attrs) => attrs.src)
    .filter((src) => src?.startsWith("/_next/static/") && src.endsWith(".js"));
  const uniqueScripts = [...new Set(scriptPaths)];
  let totalJavaScript = 0;
  let totalCompressedJavaScript = 0;
  let largestChunk = 0;

  for (const scriptPath of uniqueScripts) {
    const response = await fetch(`${baseUrl}${scriptPath}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    totalJavaScript += bytes.byteLength;
    totalCompressedJavaScript += gzipSync(bytes).byteLength;
    largestChunk = Math.max(largestChunk, bytes.byteLength);
  }

  record("Performance", "JavaScript moderno inicial da Home", totalJavaScript <= 700 * 1024, `${(totalJavaScript / 1024).toFixed(1)} KiB / 700 KiB`);
  record("Performance", "JavaScript inicial compactado", totalCompressedJavaScript <= 230 * 1024, `${(totalCompressedJavaScript / 1024).toFixed(1)} KiB gzip / 230 KiB`);
  record("Performance", "Maior chunk JavaScript", largestChunk <= 300 * 1024, `${(largestChunk / 1024).toFixed(1)} KiB / 300 KiB`);

  const missingPage = await request("/__validation-route-that-must-not-exist__");
  record("Rotas", "Página inexistente", missingPage.status === 404, `HTTP ${missingPage.status}`);
  record("Acessibilidade", "404 — estrutura", tags(missingPage.body, "main").length === 1 && tags(missingPage.body, "h1").length === 1 && /<main\b[^>]*id=["']main-content["']/i.test(missingPage.body), "main#main-content e h1 presentes");
  record("Conteúdo", "404 — idioma", missingPage.body.includes("Página não encontrada"), "mensagem em português");

  const securityHeaders = {
    "Content-Security-Policy": missingPage.headers.get("content-security-policy"),
    "Referrer-Policy": missingPage.headers.get("referrer-policy"),
    "X-Content-Type-Options": missingPage.headers.get("x-content-type-options"),
    "X-Frame-Options": missingPage.headers.get("x-frame-options"),
    "Permissions-Policy": missingPage.headers.get("permissions-policy"),
  };
  const defensiveHeadersValid = Boolean(
    securityHeaders["Content-Security-Policy"]?.includes("frame-ancestors 'none'") &&
    securityHeaders["Referrer-Policy"] === "strict-origin-when-cross-origin" &&
    securityHeaders["X-Content-Type-Options"] === "nosniff" &&
    securityHeaders["X-Frame-Options"] === "DENY" &&
    securityHeaders["Permissions-Policy"]?.includes("camera=()")
  );
  record("Segurança", "Headers defensivos", defensiveHeadersValid, Object.entries(securityHeaders).map(([key, value]) => `${key}=${value ? "presente" : "ausente"}`).join("; "));
  record("Segurança", "Assinatura do framework", !missingPage.headers.has("x-powered-by"), "X-Powered-By ausente");

  const robots = await request("/robots.txt");
  record("Indexação", "robots.txt", robots.status === 200 && /Allow:\s*\//i.test(robots.body) && robots.body.includes(`${publicUrl}/sitemap.xml`), `HTTP ${robots.status}`);

  const sitemap = await request("/sitemap.xml");
  const sitemapLocations = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  const expectedLocations = routes.map(canonicalFor);
  const exactSitemap = sitemap.status === 200 && sitemapLocations.length === expectedLocations.length && expectedLocations.every((url) => sitemapLocations.includes(url));
  record("Indexação", "sitemap.xml", exactSitemap, `HTTP ${sitemap.status}; ${sitemapLocations.length}/${expectedLocations.length} URLs`);
}

async function validateStaticProject() {
  const globalCss = await fs.readFile(path.join(rootDir, "src/styles/globals.css"), "utf8");
  const layout = await fs.readFile(path.join(rootDir, "src/app/layout.tsx"), "utf8");
  const sourceFiles = [];

  async function walk(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(absolutePath);
      else if (/\.tsx?$/.test(entry.name)) sourceFiles.push(absolutePath);
    }
  }

  await walk(path.join(rootDir, "src"));
  const source = (await Promise.all(sourceFiles.map((file) => fs.readFile(file, "utf8")))).join("\n");

  record("Acessibilidade", "Estilo de foco", globalCss.includes(":focus-visible"), ":focus-visible configurado");
  record("Acessibilidade", "Movimento reduzido", globalCss.includes("prefers-reduced-motion"), "preferência respeitada");
  record("Acessibilidade", "Link de salto no layout", layout.includes('href="#main-content"'), "presente no layout raiz");
  record("Imagens", "Componente de imagem", !/<img\b/i.test(source), "nenhum <img> bruto no código-fonte");

  const publicImageDirectory = path.join(rootDir, "public/images");
  const publicImages = await fs.readdir(publicImageDirectory, { withFileTypes: true });
  const publicImageFiles = publicImages.filter((entry) => entry.isFile());
  const publicImageStats = await Promise.all(publicImageFiles.map(async (entry) => ({
    name: entry.name,
    size: (await fs.stat(path.join(publicImageDirectory, entry.name))).size,
  })));
  const totalPublicImageBytes = publicImageStats.reduce((sum, image) => sum + image.size, 0);
  const largestPublicImageBytes = Math.max(0, ...publicImageStats.map((image) => image.size));
  const modernFormatsOnly = publicImageStats.every((image) => /\.(?:webp|avif)$/i.test(image.name));
  record("Imagens", "Fontes públicas modernas", modernFormatsOnly, publicImageStats.map((image) => image.name).join(", "));
  record("Imagens", "Orçamento das fontes públicas", totalPublicImageBytes <= 400 * 1024 && largestPublicImageBytes <= 150 * 1024, `${(totalPublicImageBytes / 1024).toFixed(1)} KiB total; maior ${(largestPublicImageBytes / 1024).toFixed(1)} KiB`);

  const contentData = await fs.readFile(path.join(rootDir, "src/data/site.ts"), "utf8");
  if (/a confirmar|TODO/i.test(contentData)) warn("Conteúdo pendente", "src/data/site.ts ainda contém informação marcada como a confirmar ou TODO");

  const faviconCandidates = ["favicon.ico", "icon.png", "icon.jpg", "icon.svg"];
  const faviconExists = (await Promise.all(faviconCandidates.map(async (name) => {
    try {
      await fs.access(path.join(rootDir, "src/app", name));
      return true;
    } catch {
      return false;
    }
  }))).some(Boolean);
  if (!faviconExists) warn("Favicon oficial", "nenhum favicon ou app icon foi encontrado em src/app");
}

async function writeReport() {
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  const failures = results.filter((result) => !result.passed);
  const passed = results.length - failures.length;
  const status = failures.length === 0 ? "APROVADO" : "REPROVADO";
  const lines = [
    "# Relatório do Validation Harness",
    "",
    `- Data: ${new Date().toISOString()}`,
    `- Alvo: ${baseUrl}`,
    `- URL pública esperada: ${publicUrl}`,
    `- Resultado: **${status}**`,
    `- Checks: ${passed} aprovados, ${failures.length} reprovados, ${warnings.length} alertas`,
    "",
    "## Checks",
    "",
    "| Status | Categoria | Verificação | Detalhes |",
    "| --- | --- | --- | --- |",
    ...results.map((result) => `| ${result.passed ? "✅" : "❌"} | ${result.category} | ${result.check.replaceAll("|", "\\|")} | ${String(result.details).replaceAll("|", "\\|").replaceAll("\n", " ")} |`),
    "",
    "## Alertas",
    "",
    ...(warnings.length
      ? warnings.map((warning) => `- ⚠️ **${warning.check}:** ${warning.details}`)
      : ["- Nenhum alerta." ]),
    "",
    "## Conclusão",
    "",
    failures.length === 0
      ? "Todos os gates automatizados foram aprovados. A revisão humana complementar continua necessária."
      : `A publicação está bloqueada por ${failures.length} falha(s) objetiva(s). Corrija os itens marcados com ❌ e execute novamente.`,
    "",
  ];

  await fs.writeFile(reportPath, lines.join("\n"), "utf8");
  console.log(`\nRelatório: ${path.relative(rootDir, reportPath)}`);
  console.log(`Resultado: ${status} (${passed}/${results.length} checks; ${warnings.length} alertas)`);
  return failures.length === 0;
}

async function main() {
  console.log(`Validation Harness — alvo ${baseUrl}\n`);

  let buildPassed = true;
  if (!skipBuild) {
    const typecheckPassed = await runNodeCommand("TypeScript", "node_modules/typescript/bin/tsc", ["--noEmit"]);
    const lintPassed = await runNodeCommand("Lint", "node_modules/eslint/bin/eslint.js", [".", "--max-warnings", "0"]);
    buildPassed = await runNodeCommand("Build de produção", "node_modules/next/dist/bin/next", ["build"]);
    if (!typecheckPassed || !lintPassed) buildPassed = false;
  } else {
    warn("Build ignorado", "execução solicitada com --skip-build");
  }

  await validateStaticProject();

  let serverReady = true;
  if (!suppliedBaseUrl) {
    serverReady = buildPassed && (await startProductionServer());
  }

  if (serverReady) {
    try {
      await validateHttp();
    } catch (error) {
      record("Harness", "Validação HTTP", false, error.stack ?? error.message);
    }
  } else {
    record("Harness", "Validação HTTP", false, "servidor indisponível ou build reprovado");
  }

  await stopProductionServer();
  const approved = await writeReport();
  process.exitCode = approved ? 0 : 1;
}

main().catch(async (error) => {
  record("Harness", "Execução", false, error.stack ?? error.message);
  await stopProductionServer();
  await writeReport();
  process.exitCode = 1;
});
