<script setup>

</script>

<template>
  <header>
    <div class="hero">
      <h1>BRENDAN FLEURDELYS</h1>
      <h2>Bienvenue sur mon portail personnel</h2>
      <p>Retrouvez tous mes projets et sites ici</p>
      <div class="scroll-down">
        <a href="#projects" aria-label="Scroll to projects">

            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </a>
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

h2 {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: #fff;
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

@keyframes linePulse {
  0%, 100% { opacity: 0.5; transform: scaleX(1); }
  50% { opacity: 1; transform: scaleX(1.2); }
}

@keyframes bounce {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, -10px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  h1 { font-size: 2.2rem; }
  h2 { font-size: 1.1rem; }
  p { font-size: 1rem; }
}
</style>
