import { StrictMode, useEffect } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/queryClient'
import './index.css'
import i18n, { isPrerendered, storedLanguage } from './i18n'
import { languageFromPath, localizedPath, routerBasename } from './lib/languageRoutes'
import App from './App.tsx'

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}

// Après l'hydratation (les effets ne s'exécutent qu'une fois le HTML repris), applique le choix
// de langue du visiteur sur les URL françaises : anglais → version /en, lingala/swahili → traduction
// sur place. On se fie au choix explicite (localStorage), jamais à la langue du navigateur, pour
// ne pas rediriger les robots d'indexation.
function VisitorLanguage() {
  useEffect(() => {
    const { pathname, search, hash } = window.location
    if (languageFromPath(pathname) === 'en') return
    const stored = storedLanguage()
    if (stored === 'en') window.location.replace(localizedPath(pathname, 'en') + search + hash)
    else if (stored && stored !== i18n.language) void i18n.changeLanguage(stored)
  }, [])
  return null
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

const container = document.getElementById('root')!

// Page pré-rendue au build : React reprend le HTML existant au lieu de tout reconstruire
if (isPrerendered) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
