import { readFile } from "node:fs/promises";

const origin = "https://www.reemite.com";
const host = new URL(origin).host;
const key = (await readFile(new URL("../public/indexnow-key.txt", import.meta.url), "utf8")).trim();
const keyLocation = `${origin}/indexnow-key.txt`;

const [keyResponse, sitemapResponse] = await Promise.all([
  fetch(keyLocation),
  fetch(`${origin}/sitemap.xml`),
]);

if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error(`IndexNow key is not deployed at ${keyLocation}. Deploy the site before submitting URLs.`);
}
if (!sitemapResponse.ok) {
  throw new Error(`Could not read ${origin}/sitemap.xml (HTTP ${sitemapResponse.status}).`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1]);
if (urlList.length === 0) throw new Error("No URLs were found in the public sitemap.");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok) {
  throw new Error(`IndexNow rejected the submission (HTTP ${response.status}).`);
}

console.log(`IndexNow accepted ${urlList.length} Reemite URLs for discovery.`);
