// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://clevoy.io',
  integrations: [react()],
  // ~26 KB of CSS inlined into each page: no render-blocking stylesheet requests before the hero paints
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
})
