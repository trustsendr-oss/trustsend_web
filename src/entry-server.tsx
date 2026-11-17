import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import i18n from "./i18n";
import App from "./App";
import {
  AUTO_TRANSLATIONS_ENABLED,
  languageFromPath,
  localeTag,
  routerBasename,
} from "./lib/languageRoutes";
import * as englishContent from "./data/content.en";
import englishMessages from "./i18n/locales/en.json";
import { PRERENDER_URLS, renderHeadTags, renderSitemap, seoConfigEn } from "./seo";
import { setAutomaticTranslationBundle } from "./lib/automaticTranslations";

const translationSource = {
  content: englishContent,
  messages: englishMessages,
  seo: Object.fromEntries(
    Object.entries(seoConfigEn).map(([route, seo]) => [
      route,
      { title: seo.title, description: seo.description, keywords: seo.keywords },
    ]),
  ),
};

function clearServerQueryCache() {
  queryClient.clear();
}

/** Rendu HTML d'une page (ex. "/pricing", "/en/pricing", "/ln/pricing"), utilisé au build. */
function render(url: string) {
  // Ressources embarquées : le changement de langue est synchrone
  void i18n.changeLanguage(languageFromPath(url));
  return renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url} basename={routerBasename(url)}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
}

export const prerenderApi = {
  AUTO_TRANSLATIONS_ENABLED,
  languageFromPath,
  localeTag,
  PRERENDER_URLS,
  render,
  renderHeadTags,
  renderSitemap,
  setAutomaticTranslationBundle,
  translationSource,
  clearServerQueryCache,
};
