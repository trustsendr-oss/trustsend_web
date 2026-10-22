import { StrictMode, useEffect } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/queryClient'
import './index.css'
import i18n, { detectLanguage, isPrerendered } from './i18n'
import App from './App.tsx'

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}

// Après l'hydratation (les effets ne s'exécutent qu'une fois le HTML repris), passe à la langue du visiteur
function VisitorLanguage() {
  useEffect(() => {
    const language = detectLanguage()
    if (language !== i18n.language) void i18n.changeLanguage(language)
  }, [])
  return null
}

const app = (
  <StrictMode>
    {isPrerendered && <VisitorLanguage />}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
