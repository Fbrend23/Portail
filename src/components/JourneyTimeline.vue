<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const list = ref(null)
// Tout est visible dans le HTML pré-généré ; l'apparition au défilement ne
// s'active qu'une fois le JavaScript chargé, et jamais si les animations sont réduites
const reveal = ref(false)
let observer = null

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !('IntersectionObserver' in window)) return

  reveal.value = true
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -10% 0px' })
  list.value.querySelectorAll('.step').forEach((step) => observer.observe(step))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="parcours" class="journey" aria-labelledby="journey-title">
    <h2 id="journey-title">{{ t.journey.title }}</h2>
    <p class="journey-intro">{{ t.journey.intro }}</p>

    <ol ref="list" class="steps" :class="{ reveal }">
      <li v-for="(step, index) in t.journey.items" :key="index" class="step" :class="`is-${step.status}`">
        <span class="dot" aria-hidden="true"></span>
        <div class="step-body">
          <p class="step-meta">
            <time>{{ step.date }}</time>
            <span v-if="step.place" class="place">· {{ step.place }}</span>
            <span v-if="step.status === 'current'" class="badge">{{ t.journey.current }}</span>
          </p>
          <h3>{{ step.title }}</h3>
          <p class="step-text">{{ step.text }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.journey {
  --line: rgba(212, 241, 255, 0.18);
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  text-align: center;
  color: var(--accent, #d4f1ff);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(212, 241, 255, 0.3);
}

.journey-intro {
  margin: 0 0 3rem;
  text-align: center;
  color: #aaa;
}

.steps {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Ligne verticale qui relie les étapes */
.steps::before {
  content: '';
  position: absolute;
  top: 0.4rem;
  bottom: 0.4rem;
  left: 7px;
  width: 2px;
  background: linear-gradient(to bottom, var(--line), var(--accent, #d4f1ff) 80%, transparent);
}

.step {
  position: relative;
  padding: 0 0 2.25rem 2.5rem;
}

.step:last-child {
  padding-bottom: 0;
}

.dot {
  position: absolute;
  top: 0.3rem;
  left: 0;
  width: 16px;
  height: 16px;
  border: 2px solid var(--accent, #d4f1ff);
  border-radius: 50%;
  background: #0c1e2c;
}

.is-past .dot {
  background: var(--accent, #d4f1ff);
}

/* Étape en cours : point lumineux qui pulse */
.is-current .dot {
  background: var(--accent, #d4f1ff);
  box-shadow: 0 0 0 0 rgba(212, 241, 255, 0.6);
  animation: pulse 2s ease-out infinite;
}

/* Étape à venir : point creux et pointillé */
.is-future .dot {
  border-style: dashed;
  background: transparent;
}

.step-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.25rem;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: var(--accent, #d4f1ff);
}

.place {
  color: #aaa;
}

.badge {
  padding: 0.05rem 0.5rem;
  border-radius: 999px;
  background: var(--accent, #d4f1ff);
  color: #000;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

h3 {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  color: #fff;
}

.step-text {
  margin: 0;
  color: #bbb;
  line-height: 1.5;
}

.is-future h3,
.is-future .step-text {
  color: #999;
}

/* Apparition au défilement (activée seulement côté navigateur) */
.reveal .step {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal .step.is-visible {
  opacity: 1;
  transform: none;
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 10px rgba(212, 241, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(212, 241, 255, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-current .dot {
    animation: none;
  }
}

@media (max-width: 768px) {
  .journey {
    padding: 3rem 1.25rem 1.5rem;
  }

  h2 {
    font-size: 1.6rem;
  }
}
</style>
