import { ViteSSG } from 'vite-ssg/single-page'

// Police Sora hébergée avec le site : pas de feuille de style externe qui bloque l'affichage
import '@fontsource-variable/sora'

import App from './App.vue'

// Le HTML est pré-généré au build (vite-ssg) pour que le contenu soit lisible
// sans JavaScript : moteurs de recherche et aperçus de liens.
export const createApp = ViteSSG(App, async ({ app, isClient }) => {
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
