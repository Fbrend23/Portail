<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '../i18n'

const { lang, t } = useI18n()

const list = ref(null)

// Part de la frise déjà parcourue (0 → 1). À 1 dans le HTML pré-généré et
// sans JavaScript : la ligne y est entièrement allumée
const progress = ref(1)
// Index des étapes que la lumière a atteintes
const reached = ref(new Set(t.value.journey.items.map((_, index) => index)))
// Étapes déjà apparues au défilement
const visible = ref(new Set())
// Apparition au défilement : seulement côté navigateur et animations non réduites
const animated = ref(false)

// Heure à Séoul et compte à rebours : calculés dans le navigateur, une valeur
// figée au build serait fausse dès le lendemain
const now = ref(null)

const formatTime = (timeZone) =>
  new Intl.DateTimeFormat(lang.value === 'fr' ? 'fr-CH' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone
  }).format(now.value)

const daysUntil = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number)
  const today = new Date(now.value.getFullYear(), now.value.getMonth(), now.value.getDate())
  return Math.round((new Date(year, month - 1, day) - today) / 86400000)
}

const steps = computed(() =>
  t.value.journey.items.map((step, index) => {
    const extra = {}
    if (now.value && step.timeZone) extra.clock = t.value.journey.clock(formatTime(step.timeZone))
    if (now.value && step.countdownTo) {
      const days = daysUntil(step.countdownTo)
      if (days > 0) extra.countdown = t.value.journey.countdown(days)
    }
    return { ...step, ...extra, reached: reached.value.has(index), visible: visible.value.has(index) }
  })
)

let clockTimer = null
let observer = null
let frame = null

// Repère commun à l'apparition des étapes et à l'allumage des points :
// une étape apparaît et s'allume au même moment
const ANCHOR = 0.85

const updateProgress = () => {
  frame = null
  const el = list.value
  if (!el) return
  const track = el.querySelector('.track').getBoundingClientRect()
  // Toute la frise est visible : elle a été lue, tout s'allume
  const fullyInView = track.bottom <= window.innerHeight
  const value = fullyInView
    ? 1
    : Math.min(1, Math.max(0, (window.innerHeight * ANCHOR - track.top) / track.height))
  progress.value = value

  // Un point s'allume quand l'extrémité de la ligne allumée atteint son centre
  const litEnd = track.top + value * track.height
  const lit = new Set()
  el.querySelectorAll('.dot').forEach((dot, index) => {
    const rect = dot.getBoundingClientRect()
    if (rect.top + rect.height / 2 <= litEnd + 1) lit.add(index)
  })
  reached.value = lit
}

const onScroll = () => {
  if (frame === null) frame = requestAnimationFrame(updateProgress)
}

onMounted(() => {
  now.value = new Date()
  clockTimer = setInterval(() => (now.value = new Date()), 30000)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !('IntersectionObserver' in window)) return

  animated.value = true
  updateProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      visible.value = new Set(visible.value).add(Number(entry.target.dataset.index))
      observer.unobserve(entry.target)
    }
  }, { rootMargin: `0px 0px -${Math.round((1 - ANCHOR) * 100)}% 0px` })
  list.value.querySelectorAll('.step').forEach((step) => observer.observe(step))
})

onBeforeUnmount(() => {
  clearInterval(clockTimer)
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame !== null) cancelAnimationFrame(frame)
})
</script>

<template>
  <section id="parcours" class="journey" aria-labelledby="journey-title">
    <h2 id="journey-title">{{ t.journey.title }}</h2>
    <p class="journey-intro">{{ t.journey.intro }}</p>

    <div ref="list" class="timeline" :class="{ animated }">
      <!-- Ligne éteinte, et sa partie allumée qui suit le défilement -->
      <span class="track" aria-hidden="true"></span>
      <span class="track-lit" aria-hidden="true" :style="{ transform: `scaleY(${progress})` }"></span>

      <ol class="steps">
        <li
          v-for="(step, index) in steps"
          :key="index"
          :data-index="index"
          class="step"
          :class="[`is-${step.status}`, { 'is-reached': step.reached, 'is-visible': step.visible }]"
        >
          <span class="dot" aria-hidden="true"></span>
          <div class="step-body">
            <p class="step-meta">
              <time>{{ step.date }}</time>
              <span v-if="step.place" class="place">
                · {{ step.place }}<span v-if="step.placeLocal" class="place-local" lang="ko">{{ step.placeLocal }}</span>
              </span>
              <span v-if="step.status === 'current'" class="badge">{{ t.journey.current }}</span>
              <span v-if="step.countdown" class="countdown">{{ step.countdown }}</span>
            </p>
            <h3>{{ step.title }}</h3>
            <p class="step-text">{{ step.text }}</p>
            <p v-if="step.clock" class="clock">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {{ step.clock }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.journey {
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

.timeline {
  position: relative;
}

.steps {
  margin: 0;
  padding: 0;
  list-style: none;
}

.track,
.track-lit {
  position: absolute;
  top: 0.4rem;
  bottom: 0.4rem;
  left: 7px;
  width: 2px;
  border-radius: 2px;
}

.track {
  background: rgba(212, 241, 255, 0.12);
}

.track-lit {
  background: linear-gradient(to bottom, rgba(212, 241, 255, 0.35), var(--accent, #d4f1ff));
  box-shadow: 0 0 8px rgba(212, 241, 255, 0.6);
  transform-origin: top;
  will-change: transform;
  /* Adoucit le passage à « tout allumé » quand la frise devient entièrement visible */
  transition: transform 0.25s ease-out;
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
  border: 2px solid rgba(212, 241, 255, 0.35);
  border-radius: 50%;
  background: #0c1e2c;
  transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
}

/* Le point s'allume quand la lumière l'atteint */
.is-reached .dot {
  border-color: var(--accent, #d4f1ff);
  background: var(--accent, #d4f1ff);
  box-shadow: 0 0 10px rgba(212, 241, 255, 0.7);
}

.is-current.is-reached .dot {
  animation: pulse 2s ease-out infinite;
}

/* Étape à venir : point creux et pointillé ; atteint, il s'allume sans se remplir */
.is-future .dot {
  border-style: dashed;
  background: transparent;
}

.is-future.is-reached .dot {
  background: rgba(212, 241, 255, 0.15);
  box-shadow: 0 0 10px rgba(212, 241, 255, 0.7);
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

.place-local {
  /* Espace par la marge : Vue supprime celui du template à la compilation */
  margin-left: 0.35em;
  color: var(--accent, #d4f1ff);
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

.countdown {
  padding: 0.05rem 0.5rem;
  border: 1px dashed var(--accent, #d4f1ff);
  border-radius: 999px;
  font-size: 0.75rem;
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

.clock {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0.6rem 0 0;
  padding: 0.25rem 0.7rem 0.25rem 0.5rem;
  border: 1px solid rgba(212, 241, 255, 0.25);
  border-radius: 999px;
  background: rgba(13, 13, 13, 0.4);
  color: #ddd;
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}

.clock svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: var(--accent, #d4f1ff);
  stroke-width: 2;
  stroke-linecap: round;
}

/* Apparition au défilement */
.animated .step {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animated .step.is-visible {
  opacity: 1;
  transform: none;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(212, 241, 255, 0.6);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(212, 241, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(212, 241, 255, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-current.is-reached .dot {
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
