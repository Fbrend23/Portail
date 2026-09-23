<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()

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
  tags: {
    type: Array,
    default: () => []
  },
  // Projet temporairement hors ligne : la carte reste visible, sans lien
  paused: {
    type: Boolean,
    default: false
  },
  btnText: {
    type: String,
    default: 'EXPLORER →'
  }
})
</script>

<template>
  <div class="card" :class="{ 'is-paused': paused }" :data-theme="theme">
    <span v-if="paused" class="status">{{ t.card.paused }}</span>
    <img v-if="image" :src="image" class="preview-bg" alt="" decoding="async" />
    <h2>{{ title }}</h2>
    <p :class="{ 'has-tags': tags.length }">{{ description }}</p>
    <ul v-if="tags.length" class="tags" :aria-label="t.card.techs">
      <li v-for="tag in tags" :key="tag">{{ tag }}</li>
    </ul>
    <span v-if="paused" class="btn is-disabled" aria-disabled="true">{{ t.card.comingBack }}</span>
    <a v-else :href="link" class="btn" target="_blank">{{ btnText }}</a>
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
  /* Légèrement assombrie : c'est surtout l'ombre du texte qui assure la lisibilité */
  filter: blur(1px) brightness(0.5);
  transition: opacity 0.4s ease;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  /* Ensure image respects border radius */
}

.card:hover .preview-bg {
  opacity: 1;
}

/* Au survol, le texte passe par-dessus la capture : une ombre le détache du fond */
.card:hover h2,
.card:hover p {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 0, 0, 0.8);
}

.card:hover p {
  color: #fff;
}

.card:hover .tags li {
  background: rgba(13, 13, 13, 0.85);
}

h2 {
  position: relative;
  z-index: 1;
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: var(--accent);
  font-family: var(--font-family-header);
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

p.has-tags {
  margin-bottom: 0.75rem;
}

.tags {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  margin: 0 0 0.75rem;
  padding: 0;
  list-style: none;
}

.tags li {
  padding: 0.15rem 0.55rem;
  border: 1px solid var(--accent);
  border-radius: 999px;
  color: var(--accent);
  background: rgba(13, 13, 13, 0.6);
  font-size: 0.72rem;
  letter-spacing: 0.03em;
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

.status {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  z-index: 1;
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--accent);
  border-radius: 999px;
  background: rgba(13, 13, 13, 0.85);
  color: var(--accent);
  font-size: 0.68rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.btn.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn.is-disabled:hover {
  filter: none;
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
