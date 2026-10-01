import { defineConfig } from '@playwright/test'

// Teste le site pré-généré (dist/), tel qu'il est servi en production
export default defineConfig({
  testDir: 'e2e',
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI
  },
  use: { baseURL: 'http://localhost:4173' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }]
})
