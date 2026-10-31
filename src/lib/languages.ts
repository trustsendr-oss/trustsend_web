export type Language = "fr" | "en" | "ln" | "sw";

export const flagAssets: Record<Language, string> = {
  fr: "/assets/flags/fr.svg",
  en: "/assets/flags/us.svg",
  ln: "/assets/flags/cd.svg",
  sw: "/assets/flags/tz.avif",
};

const languageCodes: Record<Language, string> = {
  fr: "FR",
  en: "EN",
  ln: "CD",
  sw: "TZ",
};

export function languageForLocale(locale: string): Language {
  if (locale.startsWith("en")) return "en";
  if (locale.startsWith("ln")) return "ln";
  if (locale.startsWith("sw")) return "sw";
  return "fr";
}

export function languageCountryCode(language: Language): string {
  return languageCodes[language];
}
