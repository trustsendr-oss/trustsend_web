import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import ln from "./locales/ln.json";
import sw from "./locales/sw.json";

const STORAGE_KEY = "TrustSend_lang";
export const supportedLanguages = ["fr", "en", "ln", "sw"] as const;

const isBrowser = typeof window !== "undefined";

/** Langue préférée du visiteur ; "fr" pendant le pré-rendu (build). */
export function detectLanguage(): string {
  if (!isBrowser) return "fr";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && new Set<string>(supportedLanguages).has(stored)) return stored;
  return navigator.language.startsWith("en") ? "en" : "fr";
}

/**
 * Les pages pré-rendues sont en français : on hydrate d'abord en "fr" pour que React
 * reconnaisse le HTML, puis main.tsx bascule vers la langue du visiteur.
 */
export const isPrerendered = isBrowser && !!document.getElementById("root")?.hasChildNodes();

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ln: { translation: ln },
    sw: { translation: sw },
  },
  lng: isPrerendered ? "fr" : detectLanguage(),
  fallbackLng: "fr",
  supportedLngs: supportedLanguages,
  load: "languageOnly",
  returnEmptyString: false,
  interpolation: { escapeValue: false },
  // Ressources embarquées : initialisation synchrone, indispensable au rendu serveur
  initAsync: false,
});

if (isBrowser) {
  i18n.on("languageChanged", (lng) => {
    localStorage.setItem(STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  });

  document.documentElement.lang = i18n.language;
}

export default i18n;
