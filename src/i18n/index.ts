import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import ln from "./locales/ln.json";
import sw from "./locales/sw.json";

const STORAGE_KEY = "TrustSend_lang";
export const supportedLanguages = ["fr", "en", "ln", "sw"] as const;

function detectLanguage(): string {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && new Set<string>(supportedLanguages).has(stored)) return stored;
  return navigator.language.startsWith("en") ? "en" : "fr";
}

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ln: { translation: ln },
    sw: { translation: sw },
  },
  lng: detectLanguage(),
  fallbackLng: "fr",
  supportedLngs: supportedLanguages,
  load: "languageOnly",
  returnEmptyString: false,
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  document.documentElement.lang = lng;
});

document.documentElement.lang = i18n.language;

export default i18n;
