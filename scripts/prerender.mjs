// Pré-rendu des pages publiques : écrit un HTML complet (contenu + balises SEO) par route.
// Lancé après `vite build` (client) et `vite build --ssr src/entry-server.tsx` (serveur).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const serverEntry = join(root, "dist-ssr", "entry-server.js");

const { render, renderHeadTags, renderSitemap, PRERENDER_URLS } = await import(pathToFileURL(serverEntry).href);
const template = readFileSync(join(dist, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error("index.html : bloc <!--seo:start-->…<!--seo:end--> ou <div id=\"root\"></div> introuvable");
}

// Coquille vide pour les routes non pré-rendues (dashboard, connexion…), servie par vercel.json
writeFileSync(join(dist, "app-shell.html"), template.replace(SEO_BLOCK, "<title>Reemite</title>"));

// "/" → index.html, "/pricing" → pricing.html, "/en" → en.html, "/en/pricing" → en/pricing.html
// (servis sans extension grâce à cleanUrls dans vercel.json)
for (const url of PRERENDER_URLS) {
  const lang = url === "/en" || url.startsWith("/en/") ? "en" : "fr";
  const html = template
    .replace('<html lang="fr">', `<html lang="${lang}">`)
    .replace(SEO_BLOCK, renderHeadTags(url))
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
  const file = url === "/" ? "index.html" : `${url.slice(1)}.html`;
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  writeFileSync(join(dist, file), html);
  console.log(`  pré-rendu ${url.padEnd(31)} → dist/${file}`);
}

// Sitemap généré depuis les mêmes routes, avec les versions linguistiques de chaque page
writeFileSync(join(dist, "sitemap.xml"), renderSitemap(new Date().toISOString().slice(0, 10)));
console.log(`  sitemap.xml : ${PRERENDER_URLS.length} URLs`);

rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
