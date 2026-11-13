import * as englishContent from "../data/content.en";
import englishMessages from "../i18n/locales/en.json";
import i18n from "../i18n";

export type AutomaticLanguage = "ln" | "sw";
export type AutomaticSeoEntries = Record<
  string,
  { title: string; description: string; keywords: string }
>;

export type AutomaticTranslationBundle = {
  content: typeof englishContent;
  messages: typeof englishMessages;
  seo: AutomaticSeoEntries;
};

const bundles: Partial<Record<AutomaticLanguage, AutomaticTranslationBundle>> = {};

export function setAutomaticTranslationBundle(
  language: AutomaticLanguage,
  bundle: AutomaticTranslationBundle,
) {
  bundles[language] = bundle;
  i18n.addResourceBundle(language, "translation", bundle.messages, true, true);
}

export function getAutomaticTranslationBundle(language: string) {
  return language === "ln" || language === "sw" ? bundles[language] : undefined;
}

export async function loadAutomaticTranslationBundle(language: AutomaticLanguage) {
  const cached = bundles[language];
  if (cached) return cached;

  const response = await fetch(`/auto-translations/${language}.json`);
  if (!response.ok) {
    throw new Error(`Impossible de charger la traduction ${language} (${response.status}).`);
  }

  const bundle: AutomaticTranslationBundle = await response.json();
  setAutomaticTranslationBundle(language, bundle);
  return bundle;
}
