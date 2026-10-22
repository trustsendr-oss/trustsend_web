// Pré-rendu des pages publiques : écrit un HTML complet (contenu + balises SEO) par route.
// Lancé après `vite build` (client) et `vite build --ssr src/entry-server.tsx` (serveur).
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const serverEntry = join(root, "dist-ssr", "entry-server.js");

const { render, renderHeadTags, PRERENDER_ROUTES, CANONICAL_ORIGIN } = await import(pathToFileURL(serverEntry).href);
const template = readFileSync(join(dist, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error("index.html : bloc <!--seo:start-->…<!--seo:end--> ou <div id=\"root\"></div> introuvable");
}

// Coquille vide pour les routes non pré-rendues (dashboard, connexion…), servie par vercel.json
writeFileSync(join(dist, "app-shell.html"), template.replace(SEO_BLOCK, "<title>Reemite</title>"));

for (const route of PRERENDER_ROUTES) {
  const html = template
    .replace(SEO_BLOCK, renderHeadTags(route))
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  writeFileSync(join(dist, file), html);
  console.log(`  pré-rendu ${route.padEnd(28)} → dist/${file}`);
}

// Sitemap généré depuis les mêmes routes : une page pré-rendue y figure automatiquement
const lastmod = new Date().toISOString().slice(0, 10);
const urls = PRERENDER_ROUTES.map(
  (route) => `  <url>\n    <loc>${CANONICAL_ORIGIN}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
).join("\n");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`  sitemap.xml : ${PRERENDER_ROUTES.length} URLs`);

rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
