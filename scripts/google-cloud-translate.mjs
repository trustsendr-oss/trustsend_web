const MAX_BATCH_ITEMS = 80;
const MAX_BATCH_CHARACTERS = 24000;
const MAX_TEXT_CHUNK = 4500;
const STRUCTURAL_CONTENT_KEYS = new Set([
  "className",
  "code",
  "currency",
  "href",
  "icon",
  "id",
  "key",
  "layout",
  "name",
  "src",
  "target",
  "to",
  "type",
  "unit",
  "url",
  "value",
  "variant",
]);

function isNonTranslatable(value) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(value) || /^\/[a-z0-9/_-]*$/i.test(value);
}

function splitText(value) {
  const parts = [];
  let rest = value;

  while (rest.length > MAX_TEXT_CHUNK) {
    let splitAt = rest.lastIndexOf(" ", MAX_TEXT_CHUNK);
    if (splitAt < MAX_TEXT_CHUNK * 0.6) splitAt = MAX_TEXT_CHUNK;
    parts.push(rest.slice(0, splitAt));
    rest = rest.slice(splitAt).trimStart();
  }

  parts.push(rest);
  return parts;
}

function collectStrings(value, path = [], strings = [], preserveStructure = false) {
  if (typeof value === "string") {
    if (!value.trim() || isNonTranslatable(value)) return strings;
    strings.push({ path, parts: splitText(value) });
  } else if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectStrings(item, [...path, index], strings, preserveStructure),
    );
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (preserveStructure && STRUCTURAL_CONTENT_KEYS.has(key)) continue;
      collectStrings(item, [...path, key], strings, preserveStructure);
    }
  }
  return strings;
}

function protectPlaceholders(value) {
  const placeholders = [];
  const protectedText = value.replace(/\{\{\s*[\w.-]+\s*\}\}/g, (match) => {
    const token = `ZXQPLACEHOLDER${placeholders.length}QXZ`;
    placeholders.push([token, match]);
    return token;
  });
  return { protectedText, placeholders };
}

function restorePlaceholders(value, placeholders) {
  return placeholders.reduce((text, [token, original]) => text.replaceAll(token, original), value);
}

function decodeHtmlEntities(value) {
  return value.replace(
    /&(?:amp|lt|gt|quot|apos|#39|#x27|#(\d+)|#x([0-9a-f]+));/gi,
    (entity, decimal, hexadecimal) => {
      const normalized = entity.toLowerCase();
      if (normalized === "&amp;") return "&";
      if (normalized === "&lt;") return "<";
      if (normalized === "&gt;") return ">";
      if (normalized === "&quot;") return '"';
      if (normalized === "&apos;" || normalized === "&#39;" || normalized === "&#x27;") {
        return "'";
      }
      const codePoint = decimal ? Number(decimal) : Number.parseInt(hexadecimal, 16);
      return String.fromCodePoint(codePoint);
    },
  );
}

async function translateBatch(values, language, apiKey) {
  const protectedValues = values.map(protectPlaceholders);
  const response = await fetch("https://translation.googleapis.com/language/translate/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
    },
    body: JSON.stringify({
      q: protectedValues.map(({ protectedText }) => protectedText),
      source: "en",
      target: language,
      format: "text",
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    const message = result?.error?.message || response.statusText;
    throw new Error(`Google Cloud Translation (${language}) a répondu ${response.status}: ${message}`);
  }

  const translations = result?.data?.translations;
  if (!Array.isArray(translations) || translations.length !== values.length) {
    throw new Error(`Réponse Google Cloud Translation invalide pour la langue ${language}.`);
  }

  return translations.map(({ translatedText }, index) => {
    if (typeof translatedText !== "string") {
      throw new Error(`Traduction Google Cloud absente pour la langue ${language}.`);
    }
    return restorePlaceholders(
      decodeHtmlEntities(translatedText),
      protectedValues[index].placeholders,
    );
  });
}

async function translateValue(value, language, apiKey, preserveStructure = false) {
  const result = JSON.parse(JSON.stringify(value));
  const entries = collectStrings(value, [], [], preserveStructure);
  const workItems = [];

  for (const entry of entries) {
    entry.parts.forEach((part, partIndex) => {
      workItems.push({ entry, partIndex, text: part });
    });
  }

  const translatedParts = new Map();
  let batch = [];
  let batchCharacters = 0;

  async function flushBatch() {
    if (!batch.length) return;
    const output = await translateBatch(batch.map(({ text }) => text), language, apiKey);
    output.forEach((translated, index) => {
      const { entry, partIndex } = batch[index];
      const key = JSON.stringify(entry.path);
      const parts = translatedParts.get(key) ?? [];
      parts[partIndex] = translated;
      translatedParts.set(key, parts);
    });
    batch = [];
    batchCharacters = 0;
  }

  for (const item of workItems) {
    if (
      batch.length >= MAX_BATCH_ITEMS ||
      batchCharacters + item.text.length > MAX_BATCH_CHARACTERS
    ) {
      await flushBatch();
    }
    batch.push(item);
    batchCharacters += item.text.length;
  }
  await flushBatch();

  for (const entry of entries) {
    const path = entry.path;
    let parent = result;
    for (const key of path.slice(0, -1)) parent = parent[key];
    parent[path[path.length - 1]] = (translatedParts.get(JSON.stringify(path)) ?? entry.parts).join(" ");
  }

  return result;
}

export async function translateBundle(source, language, apiKey) {
  const content = await translateValue(source.content, language, apiKey, true);
  const translatedMenus = {};
  for (const [sourceLabel, menu] of Object.entries(source.content.navMegaMenus ?? {})) {
    const sourceLink = source.content.navLinks?.find((link) => link.label === sourceLabel);
    const translatedLink = sourceLink
      ? content.navLinks?.find((link) => link.href === sourceLink.href)
      : undefined;
    translatedMenus[translatedLink?.label ?? sourceLabel] = content.navMegaMenus[sourceLabel] ?? menu;
  }
  if (Object.keys(translatedMenus).length) content.navMegaMenus = translatedMenus;

  return {
    content,
    messages: await translateValue(source.messages, language, apiKey),
    seo: await translateValue(source.seo, language, apiKey),
  };
}
