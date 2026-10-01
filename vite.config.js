import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(process.env.VITEST ? { template: { transformAssetUrls: false } } : {}),
    vueDevTools(),
  ],
  // /en/ est généré en en/index.html, servi tel quel par Apache
  ssgOptions: {
    dirStyle: 'nested',
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
