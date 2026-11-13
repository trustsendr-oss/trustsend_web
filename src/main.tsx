import { StrictMode, useEffect } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/queryClient'
import './index.css'
import i18n, { isPrerendered, storedLanguage } from './i18n'
import { languageFromPath, localizedPath, routerBasename, AUTO_TRANSLATIONS_ENABLED } from './lib/languageRoutes'
import {
  getAutomaticTranslationBundle,
  loadAutomaticTranslationBundle,
  setAutomaticTranslationBundle,
} from './lib/automaticTranslations'
import { PRERENDER_ROUTES } from './seo'
import App from './App.tsx'

for (const [language, bundle] of Object.entries(window.__REEMITE_TRANSLATIONS__ ?? {})) {
  if (bundle && (language === "ln" || language === "sw")) {
    setAutomaticTranslationBundle(language, bundle);
  }
}

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}

// Après l'hydratation, applique le choix explicite du visiteur sans rediriger les robots d'indexation.
function VisitorLanguage() {
  useEffect(() => {
    const { pathname, search, hash } = window.location
    if (languageFromPath(pathname) !== 'fr') return
    const stored = storedLanguage()
    const shouldUseLocalizedRoute =
      stored === 'en' ||
      (AUTO_TRANSLATIONS_ENABLED &&
        (stored === 'ln' || stored === 'sw') &&
        PRERENDER_ROUTES.includes(pathname))
    if (stored && stored !== 'fr' && shouldUseLocalizedRoute) {
      window.location.replace(localizedPath(pathname, stored) + search + hash)
    } else if (stored && stored !== i18n.language) {
      void i18n.changeLanguage(stored)
    }
  }, [])
  return null
}

const container = document.getElementById('root')!

async function startApp() {
  const urlLanguage = languageFromPath(window.location.pathname)
  const selectedLanguage = urlLanguage === "fr" ? storedLanguage() : urlLanguage

  if (
    AUTO_TRANSLATIONS_ENABLED &&
    (selectedLanguage === "ln" || selectedLanguage === "sw") &&
    !getAutomaticTranslationBundle(selectedLanguage)
  ) {
    await loadAutomaticTranslationBundle(selectedLanguage)
  }

  const app = (
    <StrictMode>
      {isPrerendered && <VisitorLanguage />}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={routerBasename(window.location.pathname)}>
          <App />
        </BrowserRouter>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </StrictMode>
  )

  // Page pré-rendue au build : React reprend le HTML existant au lieu de tout reconstruire
  if (isPrerendered) {
    hydrateRoot(container, app)
  } else {
    createRoot(container).render(app)
  }
}

void startApp()
