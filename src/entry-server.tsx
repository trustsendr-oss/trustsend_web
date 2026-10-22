import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import "./i18n";
import App from "./App";

export { PRERENDER_ROUTES, renderHeadTags } from "./seo";
export { CANONICAL_ORIGIN } from "./lib/domains";

/** Rendu HTML d'une page, utilisé au build par scripts/prerender.mjs. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
}
