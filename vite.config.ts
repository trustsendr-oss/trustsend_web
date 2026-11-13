import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const translationKey = (
    env.GOOGLE_CLOUD_TRANSLATION_API_KEY || process.env.GOOGLE_CLOUD_TRANSLATION_API_KEY || ''
  ).trim()
  const automaticTranslationsEnabled = mode === 'production' && Boolean(translationKey)

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_AUTO_TRANSLATIONS_ENABLED': JSON.stringify(automaticTranslationsEnabled),
    },
  }
})
