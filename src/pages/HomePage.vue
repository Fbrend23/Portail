<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import TheHeader from '../components/TheHeader.vue'
import ProjectCard from '../components/ProjectCard.vue'
import SocialSidebar from '../components/SocialSidebar.vue'
import SocialMobile from '../components/SocialMobile.vue'
import AssistantChat from '../components/AssistantChat.vue'
import BackToTop from '../components/BackToTop.vue'
import ParticlesBackground from '../components/ParticlesBackground.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import LangSwitch from '../components/LangSwitch.vue'
import JourneyTimeline from '../components/JourneyTimeline.vue'
import { projects as projectData } from '../data/projects'
import { useI18n, localePaths, SITE_URL } from '../i18n'

const { lang, t } = useI18n()

const projects = computed(() =>
  projectData.map((project) => ({ ...project, ...t.value.projects[project.id] }))
)

// <head> propre à chaque langue : titre, description, canonical, hreflang,
// aperçus de liens et données structurées
const pageUrl = computed(() => SITE_URL + localePaths[lang.value])
useHead(() => {
  const meta = t.value.meta
  const otherLang = lang.value === 'fr' ? 'en' : 'fr'
  return {
    htmlAttrs: { lang: lang.value },
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { property: 'og:url', content: pageUrl.value },
      { property: 'og:title', content: meta.ogTitle },
      { property: 'og:description', content: meta.ogDescription },
      { property: 'og:image', content: SITE_URL + meta.ogImage },
      { property: 'og:image:alt', content: meta.ogImageAlt },
      { property: 'og:locale', content: meta.ogLocale },
      { property: 'og:locale:alternate', content: otherLang === 'fr' ? 'fr_CH' : 'en_US' }
    ],
    link: [
      { rel: 'canonical', href: pageUrl.value },
      { rel: 'alternate', hreflang: 'fr', href: SITE_URL + localePaths.fr },
      { rel: 'alternate', hreflang: 'en', href: SITE_URL + localePaths.en },
      { rel: 'alternate', hreflang: 'x-default', href: SITE_URL + localePaths.fr }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Brendan Fleurdelys',
          url: pageUrl.value,
          image: SITE_URL + meta.ogImage,
          jobTitle: meta.jobTitle,
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'ETML, École technique – École des métiers de Lausanne'
          },
          hasCredential: [
            {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: meta.credentials.category,
              name: meta.credentials.it,
              dateCreated: '2026'
            },
            {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: meta.credentials.category,
              name: meta.credentials.polymechanic,
              dateCreated: '2015'
            }
          ],
          knowsLanguage: ['fr', 'en'],
          knowsAbout: [...meta.knowsAbout, 'Astro', 'Directus', 'Vue.js', 'Supabase', 'AdonisJS', 'PWA'],
          sameAs: [
            'https://www.linkedin.com/in/brendan-fleurdelys-319b52301',
            'https://github.com/Fbrend23',
            'https://photographie.brendanfleurdelys.ch/'
          ]
        })
      }
    ]
  }
})

const isLoaded = ref(false)
const currentYear = new Date().getFullYear()

onMounted(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)

  // Précharge et décode les aperçus pendant l'écran d'intro,
  // pour qu'ils s'affichent d'un coup au survol des cartes
  projects.value.forEach(({ image }) => {
    const img = new Image()
    img.src = image
    img.decode?.().catch(() => {})
  })
})
</script>

<template>
  <main>
    <LoadingScreen @finished="isLoaded = true" />
    <ClientOnly>
      <ParticlesBackground :active="isLoaded" />
    </ClientOnly>

    <!-- Toujours rendu (donc présent dans le HTML pré-généré), masqué pendant l'intro -->
    <div class="content-wrapper" :class="{ 'is-ready': isLoaded }">
      <LangSwitch />
      <TheHeader :active="isLoaded" />

      <JourneyTimeline />

      <BackToTop />

      <section id="projects" class="projects-container">
        <div v-for="(project, index) in projects" :key="project.id" class="card-wrapper"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <ProjectCard :title="project.title" :description="project.description" :link="project.link"
            :theme="project.theme" :image="project.image" :tags="project.tags" :paused="project.paused" :btnText="project.btnText" />
        </div>
      </section>

      <footer>
        <p>
          <a href="https://contact.brendanfleurdelys.ch/" class="footer-contact">{{ t.footer.contact }}</a>
        </p>
        <p>© {{ currentYear }} Brendan Fleurdelys</p>
      </footer>


      <SocialSidebar />
      <SocialMobile />
      <AssistantChat />
    </div>
  </main>
</template>

<style>
@import '../assets/main.css';


.projects-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  /* max-width: 1200px; Removed to match legacy full width behavior */
  margin: 0 auto;
  padding-bottom: 4rem;
}

@media (max-width: 768px) {
  .projects-container {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 1.5rem;
  }
}

.card-wrapper {
  animation: fadeUp 0.8s backwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

footer {
  text-align: center;
  padding: 2rem;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.footer-contact {
  color: var(--accent);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.footer-contact:hover,
.footer-contact:focus-visible {
  border-color: currentColor;
}
</style>

<style scoped>
.content-wrapper {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.content-wrapper.is-ready {
  opacity: 1;
}

/* Les animations d'entrée attendent la fin de l'intro */
.content-wrapper:not(.is-ready) :deep(.hero),
.content-wrapper:not(.is-ready) .card-wrapper {
  animation-play-state: paused;
}
</style>
