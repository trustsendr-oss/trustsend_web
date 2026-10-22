import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import ln from "./locales/ln.json";
import sw from "./locales/sw.json";
import { languageFromPath } from "../lib/languageRoutes";

const STORAGE_KEY = "TrustSend_lang";
export const supportedLanguages = ["fr", "en", "ln", "sw"] as const;

const isBrowser = typeof window !== "undefined";

/** Langue choisie explicitement par le visiteur (sélecteur de langue), sinon null. */
export function storedLanguage(): string | null {
  if (!isBrowser) return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && new Set<string>(supportedLanguages).has(stored) ? stored : null;
}

/** Mémorise un choix de langue fait avant une navigation complète (changement d'URL de langue). */
export function rememberLanguage(lng: string) {
  localStorage.setItem(STORAGE_KEY, lng);
}

/** Langue préférée du visiteur ; "fr" pendant le pré-rendu (build). */
export function detectLanguage(): string {
  if (!isBrowser) return "fr";
  return storedLanguage() ?? (navigator.language.startsWith("en") ? "en" : "fr");
}

/**
 * Les pages pré-rendues sont dans la langue de leur URL (/en → anglais, sinon français) :
 * on hydrate dans cette langue pour que React reconnaisse le HTML.
 */
export const isPrerendered = isBrowser && !!document.getElementById("root")?.hasChildNodes();

const urlLanguage = isBrowser ? languageFromPath(window.location.pathname) : "fr";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ln: { translation: ln },
    sw: { translation: sw },
  },
  lng: urlLanguage === "en" || isPrerendered ? urlLanguage : detectLanguage(),
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
