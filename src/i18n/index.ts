import { computed } from 'vue'
import { useRoute } from 'vue-router'

import fr from './fr'
import en from './en'

export type Lang = 'fr' | 'en'
export const messages: Record<Lang, typeof fr> = { fr, en }

export const SITE_URL = 'https://brendanfleurdelys.ch'

// Adresse de chaque version, pour les liens entre langues et les balises hreflang
export const localePaths: Record<Lang, string> = { fr: '/', en: '/en/' }

// La langue vient de la route (meta.lang) : chaque version est une page pré-générée
export function useI18n() {
  const route = useRoute()
  const lang = computed(() => (route.meta.lang as Lang | undefined) ?? 'fr')
  const t = computed(() => messages[lang.value])
  return { lang, t }
}
