<script setup>
</script>

<template>
  <div class="social-navbar">
    <a href="https://www.linkedin.com/in/brendan-fleurdelys-319b52301" target="_blank" title="Linkedin" aria-label="LinkedIn">
      <i class="fa-brands fa-linkedin"></i>
    </a>
    <a href="https://github.com/Fbrend23" target="_blank" title="Github" aria-label="GitHub">
      <i class="fa-brands fa-github"></i>
    </a>
  </div>
</template>

<style scoped>
.social-navbar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  gap: 1rem;
  padding: 1rem 0.5rem;
  z-index: 1000;
}

.social-navbar a {
  color: var(--accent, #33ccff);
  font-size: 1.8rem;
  text-align: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
              color 0.3s ease, 
              text-shadow 0.3s ease;
  opacity: 0.7;
}

.social-navbar a:hover {
  transform: scale(1.2);
  color: #ffffff;
  text-shadow: 0 0 20px var(--accent, #33ccff), 0 0 40px var(--accent, #33ccff);
  opacity: 1;
}

@media (max-width: 768px) {
  .social-navbar {
    display: none;
  }
}
</style>
