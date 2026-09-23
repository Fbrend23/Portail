<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  // Passe à true à la fin de l'écran d'intro : l'animation démarre alors
  active: {
    type: Boolean,
    default: false
  }
})

const phrases = [
  "Informaticien CFC en développement d'applications",
  'Développeur web',
  'Photographe animalier amateur',
  'Actuellement en stage à Séoul',
  'Français · English · 한국어 en cours'
]

// La première phrase est affichée en entier dès le HTML pré-généré
const typed = ref(phrases[0])
let timer = null

const wait = (ms) => new Promise((resolve) => { timer = setTimeout(resolve, ms) })

const runTypewriter = async () => {
  let index = 0
  for (;;) {
    await wait(2500)
    while (typed.value.length > 0) {
      typed.value = typed.value.slice(0, -1)
      await wait(30)
    }
    index = (index + 1) % phrases.length
    await wait(400)
    for (const char of phrases[index]) {
      typed.value += char
      await wait(60)
    }
  }
}

watch(() => props.active, (active) => {
  if (!active || timer !== null) return
  // Pas d'animation pour qui a réduit les animations : la première phrase reste
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  runTypewriter()
}, { immediate: true })

onBeforeUnmount(() => clearTimeout(timer))

const scrollToProjects = () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <header>
    <div class="hero">
      <h1>BRENDAN FLEURDELYS</h1>
      <h2>
        <!-- Texte complet pour Google et les lecteurs d'écran, la ligne animée est décorative -->
        <span class="visually-hidden">{{ phrases.join(' · ') }}</span>
        <span class="typed" aria-hidden="true">{{ typed }}<span class="caret"></span></span>
      </h2>
      <p>Retrouvez ici tous mes projets</p>
      <div class="scroll-down">
        <button type="button" class="scroll-btn" @click="scrollToProjects" aria-label="Voir les projets">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 0;
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero {
  text-align: center;
  position: relative;
  z-index: 10;
  animation: fadeIn 1.5s ease-out;
}

h1 {
  font-family: "Sora", sans-serif;
  font-size: 3.5rem;
  color: var(--accent, #d4f1ff);
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
  position: relative;

  text-shadow: 0 0 10px rgba(212, 241, 255, 0.4),
    0 0 20px rgba(212, 241, 255, 0.2);
}

h1::after {
  content: "";
  display: block;
  margin: 1rem auto 0;
  width: 60%;
  height: 4px;
  background: linear-gradient(to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      var(--accent, #d4f1ff),
      rgba(255, 255, 255, 0.2),
      transparent);
  clip-path: polygon(0% 50%,
      50% 0%,
      100% 50%,
      50% 100%);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  animation: linePulse 4s ease-in-out infinite;
}

h2 {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: #fff;
  /* Hauteur fixe : la ligne ne doit pas faire sauter la page en s'effaçant */
  min-height: 1.4em;
  line-height: 1.4;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.caret {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  margin-left: 3px;
  vertical-align: -0.15em;
  background: var(--accent, #d4f1ff);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

p {
  font-size: 1.2rem;
  color: #aaa;
}

.scroll-down {
  position: absolute;
  bottom: -4rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  color: var(--accent, #d4f1ff);
  cursor: pointer;
}

.scroll-down a {
  color: inherit;
  display: block;
}

.scroll-btn {
  display: block;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
}

.scroll-btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
  border-radius: 4px;
}

@keyframes linePulse {

  0%,
  100% {
    opacity: 0.5;
    transform: scaleX(1);
  }

  50% {
    opacity: 1;
    transform: scaleX(1.2);
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translate(-50%, 0);
  }

  50% {
    transform: translate(-50%, -10px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.2rem;
  }

  h2 {
    font-size: 1.1rem;
    /* La phrase la plus longue peut passer sur deux lignes */
    min-height: 2.8em;
    padding: 0 1rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>
