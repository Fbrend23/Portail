<script setup>
import { onMounted, ref } from 'vue'

const isVisible = ref(true)
const emit = defineEmits(['finished'])

onMounted(() => {
  // Simulate loading time or wait for assets
  setTimeout(() => {
    isVisible.value = false
    setTimeout(() => {
        emit('finished')
    }, 500) // Wait for fade out
  }, 2500) // 2.5s intro
})
</script>

<template>
  <transition name="fade-out">
    <div v-if="isVisible" id="intro-overlay">
      <div class="intro-content">
        <p>Initialisation<span class="dots-loading"></span></p>
        <h1>BRENDAN FLEURDELYS</h1>
      </div>
    </div>
  </transition>
</template>

<style scoped>
#intro-overlay {
    position: fixed;
    inset: 0;
    /* Transparent background to see Nebula */
    background: transparent;
    backdrop-filter: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.intro-content {
    text-align: center;
}

.intro-content h1 {
  font-family: "Sora", sans-serif;
  font-size: 3.5rem;
  color: var(--accent, #d4f1ff);
  text-shadow: 0 0 6px var(--accent, #d4f1ff), 0 0 12px rgba(212, 241, 255, 0.2),
    0 0 18px rgba(212, 241, 255, 0.4);
  animation: fadeGlowIn 1.6s ease-out;
  margin: 0;
  position: relative;
}

.intro-content h1::after {
  content: "";
  display: block;
  margin: 1rem auto 0;
  width: 60%;
  height: 4px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.2),
    var(--accent, #d4f1ff),
    rgba(255, 255, 255, 0.2),
    transparent
  );
  clip-path: polygon(
    0% 50%,
    50% 0%,
    100% 50%,
    50% 100%
  );
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  animation: linePulse 4s ease-in-out infinite;
}

.intro-content p {
  font-family: 'Segoe UI', sans-serif;
  font-size: 1rem;
  opacity: 0.7;
  color: #fff;
  margin-bottom: 0.5rem;
  animation: fadeInUp 2s ease-out;
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
  0% { content: ""; }
  33% { content: "."; }
  66% { content: ".."; }
  100% { content: "..."; }
}

@keyframes linePulse {
  0%, 100% {
    opacity: 0.5;
    transform: scaleX(1);
  }
  50% {
    opacity: 1;
    transform: scaleX(1.2);
  }
}

.fade-out-leave-active {
  transition: opacity 1s ease;
}

.fade-out-leave-to {
  opacity: 0;
}
</style>
