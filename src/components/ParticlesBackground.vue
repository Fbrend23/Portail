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
  container = await tsParticles.load({ id: 'tsparticles', options })
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
  <div id="tsparticles" :class="{ ready }" aria-hidden="true"></div>
</template>

<style scoped>
/* The component renders a canvas, we force it to background */
#tsparticles {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -2;
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
