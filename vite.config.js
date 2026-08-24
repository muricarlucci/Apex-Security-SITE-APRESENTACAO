import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Dois modos de build:
 *
 *   npm run build       -> dist/            build normal (o que a Vercel usa
 *                                           quando voce sobe o repositorio)
 *   npm run build:single -> dist-standalone/ arquivo unico: CSS, JS e imagens
 *                                           embutidos num so index.html, que
 *                                           abre direto do disco, sem servidor
 *
 * No modo standalone:
 *  - `assetsInlineLimit` altissimo faz o Vite converter toda imagem importada
 *    em data URI dentro do bundle
 *  - `format: 'iife'` gera script classico em vez de ES module: modulos ES
 *    externos sao bloqueados por CORS quando a pagina roda em file://
 */
export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone'

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true
    },
    build: {
      outDir: standalone ? 'dist-standalone' : 'dist',
      sourcemap: false,
      cssCodeSplit: false,
      assetsInlineLimit: standalone ? 512 * 1024 * 1024 : 4096,
      rollupOptions: standalone
        ? {
            output: {
              format: 'iife',
              inlineDynamicImports: true,
              entryFileNames: 'app.js',
              assetFileNames: 'app.[ext]'
            }
          }
        : {}
    }
  }
})
