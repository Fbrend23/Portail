<script setup>
import { onMounted, ref } from 'vue'

const isVisible = ref(true)
// Intro sautée : l'overlay disparaît d'un coup, sans fondu par-dessus le contenu
const skipped = ref(false)
const emit = defineEmits(['finished'])

// Environ 1,6 s au total : assez pour l'effet, sans faire attendre qui arrive d'un lien
const DISPLAY_MS = 1100
const FADE_MS = 500 // doit correspondre à .fade-out-leave-active

onMounted(() => {
  // Pas d'intro pour qui a réduit les animations, ni à chaque retour
  // sur le portail pendant la même session (bouton précédent, rechargement)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let alreadySeen = false
  try {
    alreadySeen = sessionStorage.getItem('intro-vue') === '1'
    sessionStorage.setItem('intro-vue', '1')
  } catch {
    // Stockage indisponible (navigation privée stricte) : on garde l'intro
  }

  if (reduceMotion || alreadySeen) {
    skipped.value = true
    isVisible.value = false
    emit('finished')
    return
  }

  setTimeout(() => {
    isVisible.value = false
    // Le contenu apparaît une fois le fondu de l'overlay terminé
    setTimeout(() => emit('finished'), FADE_MS)
  }, DISPLAY_MS)
})
</script>

<template>
  <transition name="fade-out" :css="!skipped">
    <div v-if="isVisible" id="intro-overlay">
      <div class="intro-content">
        <p>Initialisation<span class="dots-loading"></span></p>
        <div class="intro-title" aria-hidden="true">BRENDAN FLEURDELYS</div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
#intro-overlay {
  position: fixed;
  inset: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.intro-content {
  text-align: center;
}

.intro-content .intro-title {
  font-family: var(--font-family-header);
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--accent, #d4f1ff);
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  margin: 0;
  position: relative;
  text-shadow: 0 0 10px rgba(212, 241, 255, 0.4),
    0 0 20px rgba(212, 241, 255, 0.2);
  animation: fadeGlowIn 0.8s ease-out;
}

.intro-content .intro-title::after {
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

.intro-content p {
  font-family: 'Segoe UI', sans-serif;
  font-size: 1rem;
  opacity: 0.7;
  color: #fff;
  margin-bottom: 0.5rem;
  animation: fadeInUp 0.8s ease-out;
}

.dots-loading::after {
  content: "";
  animation: dots 1.2s steps(3, end) infinite;
}

@keyframes fadeGlowIn {
  from {
    opacity: 0;
    transform: scale(1.2);
    filter: blur(4px);
  }

  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 0.7;
    transform: translateY(0);
  }
}

@keyframes dots {
  0% {
    content: "";
  }

  33% {
    content: ".";
  }

  66% {
    content: "..";
  }

  100% {
    content: "...";
  }
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

.fade-out-leave-active {
  transition: opacity 0.5s ease;
}

.fade-out-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .intro-content .intro-title {
    font-size: 1.8rem;
  }
}
</style>
