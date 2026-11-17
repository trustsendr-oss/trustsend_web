/// <reference types="vite/client" />

import type { AutomaticLanguage, AutomaticTranslationBundle } from "./lib/automaticTranslations";

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_AUTO_TRANSLATIONS_ENABLED: boolean;
    /** "sandbox" pour afficher l'interface sandbox en local (voir src/lib/domains.ts). */
    readonly VITE_APP_MODE?: "sandbox" | "production";
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface Window {
    __REEMITE_TRANSLATIONS__?: Partial<Record<AutomaticLanguage, AutomaticTranslationBundle>>;
  }
}
