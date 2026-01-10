<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleSocial = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="social-mobile">
    <button id="toggle-social" @click="toggleSocial" :aria-label="isOpen ? 'Close social menu' : 'Open social menu'">
      <i :class="isOpen ? 'fa-solid fa-times' : 'fa-solid fa-share-nodes'"></i>
    </button>

    <div class="social-icons" :class="{ open: isOpen }">
      <a href="https://www.linkedin.com/in/brendan-fleurdelys-319b52301" target="_blank" title="LinkedIn">
        <i class="fa-brands fa-linkedin"></i>
      </a>
      <a href="https://github.com/Fbrend23" target="_blank" title="GitHub">
        <i class="fa-brands fa-github"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
.social-mobile {
  display: none;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  flex-direction: column-reverse;
  align-items: center;
  gap: 1rem;
}

#toggle-social {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(13, 13, 13, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-size: 1.4rem;
  color: white;
}

#toggle-social:hover {
  background: var(--accent, #33ccff);
  transform: scale(1.1);
  box-shadow: 0 0 20px var(--accent-shadow, rgba(51, 204, 255, 0.4));
  color: #000;
  border-color: transparent;
}

.social-icons {
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-icons.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.social-icons a {
  width: 50px;
  height: 50px;
  background: rgba(20, 20, 20, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.social-icons a:hover {
  background: var(--accent, #33ccff);
  color: #000;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .social-mobile {
    display: flex;
  }
}
</style>
