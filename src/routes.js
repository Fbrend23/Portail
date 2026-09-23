import HomePage from './pages/HomePage.vue'

// Chaque route est pré-générée en page HTML statique par vite-ssg ;
// meta.lang choisit la langue (voir src/i18n)
export const routes = [
  { path: '/', component: HomePage, meta: { lang: 'fr' } },
  { path: '/en/', component: HomePage, meta: { lang: 'en' } }
]
