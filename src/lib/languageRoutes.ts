export type UrlLanguage = "fr" | "en" | "ln" | "sw";

const LANGUAGE_PREFIXES: Partial<Record<UrlLanguage, string>> = {
  en: "/en",
  ln: "/ln",
  sw: "/sw",
};

const LANGUAGE_TAGS: Record<UrlLanguage, string> = {
  fr: "fr-FR",
  en: "en-US",
  ln: "ln-CD",
  sw: "sw-TZ",
};

const OPEN_GRAPH_LOCALES: Record<UrlLanguage, string> = {
  fr: "fr_FR",
  en: "en_US",
  ln: "ln_CD",
  sw: "sw_TZ",
};

export const AUTO_TRANSLATIONS_ENABLED = import.meta.env.VITE_AUTO_TRANSLATIONS_ENABLED;

export const INDEXED_LANGUAGES: UrlLanguage[] = [
  "fr",
  "en",
  ...(AUTO_TRANSLATIONS_ENABLED ? (["ln", "sw"] as const) : []),
];

/** Langue de l'URL, à partir de son préfixe. */
export function languageFromPath(pathname: string): UrlLanguage {
  for (const language of ["en", "ln", "sw"] as const) {
    const prefix = LANGUAGE_PREFIXES[language];
    if (prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))) return language;
  }
  return "fr";
}

/** Balise BCP 47 de la langue et du marché ciblés. */
export function localeTag(language: UrlLanguage): string {
  return LANGUAGE_TAGS[language];
}

/** Locale Open Graph utilisée pour les aperçus de partage. */
export function openGraphLocale(language: UrlLanguage): string {
  return OPEN_GRAPH_LOCALES[language];
}

/** Basename du routeur pour cette URL. */
export function routerBasename(pathname: string) {
  return LANGUAGE_PREFIXES[languageFromPath(pathname)];
}

/** Chemin d'une page dans une langue : localizedPath("/pricing", "en") → "/en/pricing". */
export function localizedPath(path: string, language: UrlLanguage) {
  const prefix = LANGUAGE_PREFIXES[language];
  if (!prefix) return path;
  return path === "/" ? prefix : `${prefix}${path}`;
}
