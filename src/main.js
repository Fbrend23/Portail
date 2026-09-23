import { ViteSSG } from 'vite-ssg'

// Police Sora hébergée avec le site : pas de feuille de style externe qui bloque l'affichage
import '@fontsource-variable/sora'

import App from './App.vue'
import { routes } from './routes'

// Le HTML est pré-généré au build (vite-ssg) pour que le contenu soit lisible
// sans JavaScript : moteurs de recherche et aperçus de liens.
export const createApp = ViteSSG(App, { routes }, async ({ app, isClient }) => {
  // Les particules dessinent dans un canvas : uniquement côté navigateur
  if (isClient) {
    const { default: Particles } = await import('@tsparticles/vue3')
    const { loadStarsPreset } = await import('@tsparticles/preset-stars')
    app.use(Particles, {
      init: async (engine) => {
        await loadStarsPreset(engine)
      },
    })
  }
})
