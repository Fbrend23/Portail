<script setup>
import { ref, onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import SocialSidebar from './components/SocialSidebar.vue'
import SocialMobile from './components/SocialMobile.vue'
import AssistantChat from './components/AssistantChat.vue'
import BackToTop from './components/BackToTop.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
import LoadingScreen from './components/LoadingScreen.vue'


const projects = ref([
  {
    id: 's-photo',
    title: 'Photographie animalière',
    description: 'Mon portfolio de photographie animalière',
    link: 'https://photographie.brendanfleurdelys.ch/',
    theme: 'forest',
    image: '/assets/cartes/s-photo.webp',
    tags: ['Astro', 'Directus'],
    btnText: 'EXPLORER →'
  },
  {
    id: 's-prodysos',
    title: 'Prodysos',
    description: 'Gestion de production, réalisée pour une troupe de théâtre',
    link: 'https://prodysos.app',
    theme: 'prodysos',
    image: '/assets/cartes/s-prodysos.webp',
    tags: ['Vue', 'Supabase', 'PWA'],
    btnText: 'GÉRER →'
  },
  {
    id: 's-horaire',
    title: 'Vivement la fin',
    description: 'Suivre son horaire en direct avec un clicker pour passer le temps',
    link: 'https://horaire.brendanfleurdelys.ch/',
    theme: 'flare',
    image: '/assets/cartes/s-horaire.webp',
    tags: ['Vue', 'Supabase', 'Tailwind'],
    btnText: 'SUIVRE →'
  },
  {
    id: 's-fieu',
    title: 'Maisallezfieu',
    description: 'Site d’une pièce de théâtre, réalisé pour une troupe',
    link: 'https://maisallezfieu.be/',
    theme: 'crystal',
    image: '/assets/cartes/s-fieu.webp',
    tags: ['Astro', 'Directus', 'API Prodysos'],
    btnText: 'DÉCOUVRIR →'
  },
  {
    id: 's-travel',
    title: 'TravelDB',
    description: 'Suivre ses pays visités avec carte interactive',
    link: 'https://traveldb.brendanfleurdelys.ch/',
    theme: 'sunset',
    image: '/assets/cartes/s-travel.webp',
    // Backend AdonisJS sans hébergement Node disponible pour l'instant
    paused: true,
    tags: ['Vue', 'AdonisJS', 'Leaflet'],
    btnText: 'VOYAGER →'
  },
  {
    id: 's-wiki',
    title: 'Wiki ETML',
    description: 'Mes fiches de révisions avec audio',
    link: 'https://revisions.brendanfleurdelys.ch/',
    theme: 'dream',
    image: '/assets/cartes/s-wiki.webp',
    tags: ['Vue', 'Markdown'],
    btnText: 'RÉVISER →'
  },
  {
    id: 's-tanuki',
    title: 'TanukiCode',
    description: 'Apprendre le japonais en s\'amusant',
    link: 'https://tanukicode.brendanfleurdelys.ch/',
    theme: 'tanuki',
    image: '/assets/cartes/s-tanukicode.webp',
    tags: ['Vue', 'Supabase', 'Tailwind'],
    btnText: 'APPRENDRE →'
  },
  {
    id: 's-lunchpicker',
    title: 'LunchPicker',
    description: 'Choisir un restaurant à plusieurs en Corée, en quelques swipes',
    link: 'https://lunch-picker-six.vercel.app/',
    theme: 'lunchpicker',
    image: '/assets/cartes/s-lunchpicker.webp',
    tags: ['Nuxt', 'Supabase', 'PWA'],
    btnText: 'CHOISIR →'
  },
  {
    id: 's-matinale',
    title: 'La Matinale de Séoul',
    description: 'Résumé d’actualité automatisé par IA',
    link: 'https://matinale.brendanfleurdelys.ch/',
    theme: 'matinale',
    image: '/assets/cartes/s-matinale.webp',
    tags: ['Astro', 'Directus', 'AGY', 'Claude Code'],
    btnText: 'LIRE →'
  }
])
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
      <ParticlesBackground />
    </ClientOnly>

    <!-- Toujours rendu (donc présent dans le HTML pré-généré), masqué pendant l'intro -->
    <div class="content-wrapper" :class="{ 'is-ready': isLoaded }">
      <TheHeader :active="isLoaded" />

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
          <a href="https://contact.brendanfleurdelys.ch/" class="footer-contact">Me contacter</a>
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
@import './assets/main.css';


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
