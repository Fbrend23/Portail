<script setup>

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
        value: { min: 0.1, max: 0.8 },
        animation: {
            enable: true,
            speed: 0.5,
            sync: false
        }
    }
  },
};
</script>

<template>
  <vue-particles
    id="tsparticles"
    :options="options"
  />
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
}
</style>
