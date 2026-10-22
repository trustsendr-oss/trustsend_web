import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import i18n from "./i18n";
import App from "./App";
import { languageFromPath, routerBasename } from "./lib/languageRoutes";

export { PRERENDER_URLS, renderHeadTags, renderSitemap } from "./seo";

/** Rendu HTML d'une page (ex. "/pricing" ou "/en/pricing"), utilisé au build par scripts/prerender.mjs. */
export function render(url: string) {
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
