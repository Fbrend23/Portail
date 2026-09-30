<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  // Passe à true à la fin de l'intro : les étoiles arrivent avec le contenu
  active: {
    type: Boolean,
    default: false
  }
})

const options = {
  preset: "stars",
  background: {
    color: {
      value: "transparent",
    },
  },
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
    },
    size: {
      value: { min: 0.1, max: 1.5 }
    },
    opacity: {
      value: { min: 0.8, max: 1 },
      animation: {
        enable: false
      }
    }
  },
};

// Les étoiles sont décoratives : leur moteur (~85 Ko) ne se charge qu'après l'intro,
// quand le navigateur est libre, pour ne jamais retarder le premier affichage
const ready = ref(false)
let container = null
let idleHandle = null

const start = async () => {
  const [{ tsParticles }, { loadStarsPreset }] = await Promise.all([
    import('@tsparticles/engine'),
    import('@tsparticles/preset-stars')
  ])
  await loadStarsPreset(tsParticles)
  // Étoiles immobiles si l'utilisateur a demandé moins d'animations
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  container = await tsParticles.load({
    id: 'tsparticles',
    options: { ...options, particles: { ...options.particles, move: { ...options.particles.move, enable: !reduceMotion } } }
  })
  ready.value = true
}

watch(() => props.active, (active) => {
  if (!active || idleHandle !== null) return
  idleHandle = 'requestIdleCallback' in window
    ? requestIdleCallback(start, { timeout: 1000 })
    : setTimeout(start, 200)
}, { immediate: true })

onBeforeUnmount(() => {
  if ('cancelIdleCallback' in window) cancelIdleCallback(idleHandle)
  clearTimeout(idleHandle)
  container?.destroy()
})
</script>

<template>
  <div class="stars-fade" aria-hidden="true">
    <div id="tsparticles" :class="{ ready }"></div>
  </div>
</template>

<style scoped>
/* The component renders a canvas, we force it to background */
/* Le wrapper porte l'atténuation liée au scroll (--stars), sans délai de transition */
.stars-fade {
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  opacity: var(--stars, 1);
}

#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s ease;
}

#tsparticles.ready {
  opacity: 1;
}
</style>
