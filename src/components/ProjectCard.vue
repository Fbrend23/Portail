<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'forest'
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  btnText: {
    type: String,
    default: 'EXPLORER →'
  }
})
</script>

<template>
  <div class="card" :data-theme="theme">
    <img v-if="image" :src="image" class="preview-bg" alt="" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <a :href="link" class="btn" target="_blank">{{ btnText }}</a>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 250px;
  padding: 1.5rem;
  background: var(--card-bg, #1a1a1a);
  border: 1px solid var(--accent);
  border-radius: 12px;
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
  background-color: rgba(13, 13, 13, 0.6);
  box-shadow: 0 0 10px rgba(51, 204, 255, 0.05),
    0 0 20px rgba(51, 204, 255, 0.08) inset;
  position: relative;
  overflow: visible;
  z-index: 1;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px var(--accent-shadow-hover), 0 0 20px var(--accent);
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid transparent;
  background: linear-gradient(120deg, transparent, var(--accent), transparent);
  opacity: 0.1;
  z-index: 0;
  pointer-events: none;
}

.card:hover::after {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 14px;
  background: var(--accent);
  opacity: 0.05;
  z-index: -1;
  filter: blur(8px);
  /* Soften the edge */
  animation: pulse 1.5s infinite ease-in-out;
}

/* Animations */
@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.05;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.1;
  }
}

.preview-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  filter: blur(1px);
  transition: opacity 0.4s ease;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  /* Ensure image respects border radius */
}

.card:hover .preview-bg {
  opacity: 1;
}

h2 {
  position: relative;
  z-index: 1;
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: var(--accent);
  font-family: 'Sora', sans-serif;
  text-shadow: none;
  /* Reset shadow */
}

p {
  position: relative;
  z-index: 1;
  flex-grow: 1;
  font-size: 0.95rem;
  color: #ccc;
  margin-bottom: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.btn {
  position: relative;
  z-index: 1;
  background-color: var(--accent);
  color: #000;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  display: inline-block;
  font-weight: bold;
  transition: background 0.3s;
  align-self: center;
  margin-top: auto;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn:hover {
  filter: brightness(1.3);
  box-shadow: none;
  /* Reset shadow */
  transform: none;
  /* Reset transform */
}

@media (max-width: 768px) {
  .card {
    width: 80vw;
    max-width: 400px;
    height: auto;
    min-height: 180px;
    padding: 1.2rem;
  }
}
</style>
