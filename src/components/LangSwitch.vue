<script setup>
import { useI18n, localePaths } from '../i18n'

const { lang, t } = useI18n()

// Vrais liens entre les deux pages pré-générées : chacune a son propre <head>
const languages = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' }
]
</script>

<template>
  <nav class="lang-switch" :aria-label="t.langSwitch.label">
    <a
      v-for="language in languages"
      :key="language.code"
      :href="localePaths[language.code]"
      :hreflang="language.code"
      :lang="language.code"
      :title="language.name"
      :aria-current="language.code === lang ? 'page' : undefined"
    >
      {{ language.label }}
    </a>
  </nav>
</template>

<style scoped>
.lang-switch {
  /* Attaché au haut de la page, pas à l'écran : ne recouvre pas le contenu au défilement */
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1000;
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(13, 13, 13, 0.4);
  backdrop-filter: blur(10px);
}

.lang-switch a {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-family-header);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: background 0.3s, color 0.3s;
}

.lang-switch a:hover,
.lang-switch a:focus-visible {
  color: #fff;
}

.lang-switch a[aria-current='page'] {
  background: var(--accent, #d4f1ff);
  color: #000;
}

@media (max-width: 768px) {
  .lang-switch {
    top: 0.75rem;
    right: 0.75rem;
  }
}
</style>
