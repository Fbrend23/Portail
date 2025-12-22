<script setup>
import { ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import SocialSidebar from './components/SocialSidebar.vue'
import SocialMobile from './components/SocialMobile.vue'
import AssistantChat from './components/AssistantChat.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
import LoadingScreen from './components/LoadingScreen.vue'


const projects = ref([
  {
    id: 's-photo',
    title: 'Photographie animalière',
    description: 'Portfolio photo autour de la nature',
    link: 'https://photographie.brendanfleurdelys.ch/',
    theme: 'forest',
    image: '/assets/cartes/s-photo.png'
  },
  {
    id: 's-horaire',
    title: 'Vivement la fin',
    description: 'Suivre son horaire en direct avec un clicker pour passer le temps',
    link: 'https://horaire.brendanfleurdelys.ch/',
    theme: 'flare',
    image: '/assets/cartes/s-horaire.png'
  },
  {
    id: 's-snake',
    title: 'Snake',
    description: 'Jeu du snake en javascript',
    link: 'https://snake.brendanfleurdelys.ch/',
    theme: 'void',
    image: '/assets/cartes/s-snake.png'
  },
  {
    id: 's-fieu',
    title: 'Maisallezfieu',
    description: 'Site web pour une pièce de théatre',
    link: 'https://maisallezfieu.be/',
    theme: 'crystal',
    image: '/assets/cartes/s-fieu.png'
  },
  {
    id: 's-meow',
    title: 'Meow',
    description: 'Pour se réconforter avec des images de chats',
    link: 'https://meow.brendanfleurdelys.ch/',
    theme: 'ocean',
    image: '/assets/cartes/s-meow.png'
  },
  {
    id: 's-travel',
    title: 'TravelDB',
    description: 'Suivre ses pays visités avec carte intéractive',
    link: 'https://traveldb.brendanfleurdelys.ch/',
    theme: 'sunset',
    image: '/assets/cartes/s-travel.png'
  },
  {
    id: 's-wiki',
    title: 'Wiki ETML',
    description: 'Mes fiches de révisions avec audio',
    link: 'https://revisions.brendanfleurdelys.ch/',
    theme: 'dream',
    image: '/assets/cartes/s-wiki.png'
  }
])
const isLoaded = ref(false)
</script>

<template>
  <main>
    <LoadingScreen @finished="isLoaded = true" />
    <ParticlesBackground />


    <transition name="fade-content">
      <div v-if="isLoaded" class="content-wrapper">
        <TheHeader />

        <section id="projects" class="projects-container">
          <div v-for="(project, index) in projects" :key="project.id" class="card-wrapper"
            :style="{ animationDelay: `${index * 0.1}s` }">
            <ProjectCard :title="project.title" :description="project.description" :link="project.link"
              :theme="project.theme" :image="project.image"
              :btnText="project.theme === 'horaire' ? 'SUIVRE →' : (project.theme === 'forest' ? 'EXPLORER →' : 'DÉCOUVRIR →')" />
          </div>
        </section>

        <footer>
          <p>© 2025 Brendan Fleurdelys</p>
        </footer>


        <SocialSidebar />
        <SocialMobile />
        <AssistantChat />
      </div>
    </transition>
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
</style>

<style scoped>
.fade-content-enter-active {
  transition: opacity 1s ease 0.5s;
  /* Delay slightly to sync with loading screen fade out */
}

.fade-content-enter-from {
  opacity: 0;
}
</style>
