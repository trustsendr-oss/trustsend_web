// Pré-rendu des pages publiques : écrit un HTML complet (contenu + balises SEO) par route.
// Lancé après `vite build` (client) et `vite build --ssr src/entry-server.tsx` (serveur).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadEnv } from "vite";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const serverEntry = join(root, "dist-ssr", "entry-server.js");

const {
  AUTO_TRANSLATIONS_ENABLED,
  languageFromPath,
  localeTag,
  render,
  renderHeadTags,
  renderSitemap,
  PRERENDER_URLS,
  setAutomaticTranslationBundle,
  translationSource,
  clearServerQueryCache,
} = (await import(pathToFileURL(serverEntry).href)).prerenderApi;
const template = readFileSync(join(dist, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error("index.html : bloc <!--seo:start-->…<!--seo:end--> ou <div id=\"root\"></div> introuvable");
}

if (AUTO_TRANSLATIONS_ENABLED) {
  const env = loadEnv("production", root, "");
  const apiKey = (process.env.GOOGLE_CLOUD_TRANSLATION_API_KEY || env.GOOGLE_CLOUD_TRANSLATION_API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("GOOGLE_CLOUD_TRANSLATION_API_KEY est requis pour générer les pages ln et sw.");
  }

  const { translateBundle } = await import("./google-cloud-translate.mjs");
  const translationsDirectory = join(dist, "auto-translations");
  mkdirSync(translationsDirectory, { recursive: true });

  for (const language of ["ln", "sw"]) {
    const bundle = await translateBundle(translationSource, language, apiKey);
    setAutomaticTranslationBundle(language, bundle);
    writeFileSync(join(translationsDirectory, `${language}.json`), JSON.stringify(bundle));
    writeFileSync(
      join(translationsDirectory, `${language}.js`),
      `window.__REEMITE_TRANSLATIONS__=${JSON.stringify({ [language]: bundle }).replace(/</g, "\\u003c")};`,
    );
    console.log(`  traduction automatique ${language} générée`);
  }
}

// Coquille vide pour les routes non pré-rendues (dashboard, connexion…), servie par vercel.json
writeFileSync(join(dist, "app-shell.html"), template.replace(SEO_BLOCK, "<title>Reemite</title>"));

// "/" → index.html, "/pricing" → pricing.html, "/en/pricing", "/ln/pricing", "/sw/pricing".
// (servis sans extension grâce à cleanUrls dans vercel.json)
for (const url of PRERENDER_URLS) {
  const language = languageFromPath(url);
  const html = template
    .replace('<html lang="fr-FR">', `<html lang="${localeTag(language)}">`)
    .replace(SEO_BLOCK, renderHeadTags(url))
    .replace(
      "</head>",
      language === "ln" || language === "sw"
        ? `  <script src="/auto-translations/${language}.js"></script>\n</head>`
        : "</head>",
    )
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
  const file = url === "/" ? "index.html" : `${url.slice(1)}.html`;
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  writeFileSync(join(dist, file), html);
  console.log(`  pré-rendu ${url.padEnd(31)} → dist/${file}`);
}

// Sitemap généré depuis les mêmes routes, avec les versions linguistiques de chaque page
writeFileSync(join(dist, "sitemap.xml"), renderSitemap(new Date().toISOString().slice(0, 10)));
console.log(`  sitemap.xml : ${PRERENDER_URLS.length} URLs`);

clearServerQueryCache();
rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
