<script setup>
// Fond qui évolue avec la page : nebula -> Terre (parcours) -> forêt (galerie) -> lac (projets).
// Les scènes sont des éléments du document, posés une fois à hauteur de leur section : elles défilent
// avec le contenu, en natif (aucun calcul pendant le scroll). Seules la nebula et les étoiles, qui sont
// fixes, sont estompées via les variables CSS --nebula et --stars posées sur <html>.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const root = ref(null)
const earth = ref(null)
const forest = ref(null)
const lake = ref(null)
const shore = ref(null)

let raf = 0
let vh = 0
let earthTop = Infinity
let lakeTop = Infinity
let resizeObserver = null
let visibility = null

const clamp = (x) => Math.min(1, Math.max(0, x))

const docTop = (id) => {
  const el = document.getElementById(id)
  return el ? el.getBoundingClientRect().top + window.scrollY : null
}

// Pose une scène : position et hauteur en px dans le document. Le viewBox suit la hauteur pour que les
// décors gardent la même échelle (perVh = unités de dessin par écran de hauteur, baseH = hauteur du dessin).
// Sur écran étroit (mobile), « slice » ne montrerait qu'une bande du dessin : on impose une largeur visible
// minimale (minW, centrée sur cx) et la hauteur du viewBox suit, pour que le décor reste entier.
const placed = {}
function place(el, top, height, perVh, baseH, growUp, cx, minW) {
  if (!el) return
  const width = window.innerWidth
  let w = 1600
  let h = (height / vh) * perVh
  const visW = Math.min(1600, (width / height) * h)
  if (visW < minW) {
    w = minW
    h = (minW * height) / width
  }
  const x0 = w < 1600 ? Math.min(1600 - w, Math.max(0, cx - w / 2)) : 0
  const key = `${Math.round(top)}|${Math.round(height)}|${Math.round(h)}|${width}`
  if (placed[baseH + growUp] === key) return
  placed[baseH + growUp] = key
  el.style.top = `${top}px`
  el.style.height = `${height}px`
  el.setAttribute('viewBox', `${x0} ${growUp ? baseH - h : 0} ${w} ${h}`)
  if (el === lake.value && shore.value) shore.value.setAttribute('transform', `translate(0 ${h - baseH})`)
}

function layout() {
  const rootEl = root.value
  if (!rootEl) return
  vh = window.innerHeight
  // Le fond ne doit pas compter dans la hauteur du document qu'on mesure
  rootEl.style.height = '0px'
  const docH = document.documentElement.scrollHeight
  rootEl.style.height = `${docH}px`

  const journey = docTop('parcours')
  const photo = docTop('photo')
  const projects = docTop('projects-title')
  if (journey === null || photo === null || projects === null) return // pas encore rendues : le ResizeObserver rappellera

  // Chaque scène est calée sur sa section et couvre au moins jusqu'au début de la suivante
  earthTop = journey - 0.3 * vh // globe à hauteur du parcours
  const forestTop = photo - 0.42 * vh // cimes (à 0,72 écran du haut de la scène) un peu sous le titre de la galerie
  lakeTop = projects - 0.2 * vh // lac : jusqu'au bas de la page (montagnes -> lac -> rive)
  place(earth.value, earthTop, Math.max(1.4 * vh, photo - journey + 0.05 * vh), 900 / 1.4, 900, true, 1180, 700)
  place(forest.value, forestTop, Math.max(1.5 * vh, projects - photo + 0.6 * vh), 900 / 1.5, 900, false, 800, 0)
  place(lake.value, lakeTop, Math.max(vh, docH - lakeTop), 1290 / 2, 1290, false, 800, 900)
}

// Une variable posée sur <html> recalcule les styles de toute la page : on ne l'écrit que si elle change
const rootVars = {}
function setRoot(name, value) {
  if (rootVars[name] === value) return
  rootVars[name] = value
  document.documentElement.style.setProperty(name, value)
}

function update() {
  raf = 0
  const y = window.scrollY
  // La nebula s'efface quand la Terre arrive ; les étoiles restent, mais plus discrètes dans le ciel du soir
  setRoot('--nebula', clamp((earthTop - y) / vh).toFixed(2))
  setRoot('--stars', (1 - (1 - clamp((lakeTop - y) / vh)) * 0.6).toFixed(2))
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(update)
}

function relayout() {
  layout()
  schedule()
}

onMounted(() => {
  relayout()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', relayout, { passive: true })
  // Les sections apparaissent après le montage et changent de taille (police, images, langue)
  resizeObserver = new ResizeObserver(relayout)
  resizeObserver.observe(document.body)
  // Une scène hors écran est cachée et ses animations mises en pause
  visibility = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('off', !e.isIntersecting)),
    { rootMargin: '100px' },
  )
  ;[earth, forest, lake].forEach((s) => s.value && visibility.observe(s.value))
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', relayout)
  resizeObserver?.disconnect()
  visibility?.disconnect()
  cancelAnimationFrame(raf)
  const rootStyle = document.documentElement.style
  rootStyle.removeProperty('--nebula')
  rootStyle.removeProperty('--stars')
})
// ---- Forêt : sapins générés par couche (x, hauteur déterministes) ----
const pine = (x, b, h) => {
  const w = h * 0.24
  // 4 étages nettement séparés par des redans, puis le tronc
  const pts = [[0.42, 0.66], [0.2, 0.66], [0.62, 0.42], [0.3, 0.42], [0.82, 0.2], [0.4, 0.2], [1, 0.05], [0.1, 0.05], [0.1, 0]]
  const right = pts.map(([dx, fy]) => `L${(x + dx * w).toFixed(0)} ${(b - fy * h).toFixed(0)}`).join('')
  const left = pts.reverse().map(([dx, fy]) => `L${(x - dx * w).toFixed(0)} ${(b - fy * h).toFixed(0)}`).join('')
  return `M${x} ${b - h}${right}${left}Z`
}
const row = (step, base, h0, i0) =>
  Array.from({ length: Math.ceil(1700 / step) }, (_, i) =>
    pine(i * step - 40 + ((i * 53 + i0) % 30), base, h0 + ((i * 37 + i0) % 5) * 45)).join('')
const treesFar = row(110, 720, 260, 3)
const treesMid = row(160, 800, 340, 11)
const treesNear = row(250, 900, 470, 29)

// ---- Lac : deux chaînes de montagnes (pour les projets), puis le lac et sa rive (fin de page) ----
const range = (peaks, base) => `M0 ${base}` + peaks.map(([x, y]) => `L${x} ${y}`).join('') + `L1600 ${base}Z`
const mountainsBack = range([[0, 620], [150, 520], [260, 570], [420, 430], [560, 540], [700, 480], [860, 590], [1010, 450], [1160, 560], [1300, 500], [1450, 590], [1600, 540]], 780)
const mountainsFront = range([[0, 700], [120, 640], [300, 690], [480, 600], [640, 680], [800, 630], [980, 700], [1150, 610], [1330, 690], [1480, 640], [1600, 700]], 780)
const shoreTrees = [60, 190, 330, 1290, 1420, 1540].map((x, i) => pine(x, 1215, 150 + (i % 3) * 55)).join('')

// Lucioles
const fireflies = Array.from({ length: 16 }, (_, i) => ({
  x: 80 + ((i * 197) % 1440),
  y: 380 + ((i * 89) % 380),
  d: -((i * 1.7) % 9),
}))
</script>

<template>
  <div ref="root" class="scroll-bg" aria-hidden="true">
    <!-- TERRE : le globe (côtes Natural Earth, biomes, relief, nuages, atmosphère) est pré-rendu en image
         pour ne pas recalculer les filtres SVG (feTurbulence) à chaque image du scroll -->
    <svg ref="earth" class="scene off" viewBox="0 0 1600 900" preserveAspectRatio="xMaxYMax slice">
      <image href="/assets/terre.webp" x="920" y="210" width="520" height="520" />
      <!-- Voile sombre : le texte du parcours reste lisible devant les continents clairs -->
      <circle cx="1180" cy="470" r="236" fill="#000814" opacity="0.4" />
    </svg>

    <!-- FORÊT (galerie) -->
    <svg ref="forest" class="scene soft off fade-bottom" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sb-forest-sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="900">
          <stop offset="0" stop-color="#050d1f" stop-opacity="0.6" />
          <stop offset="0.3" stop-color="#050d1f" />
          <stop offset="0.55" stop-color="#0f2a35" />
          <stop offset="1" stop-color="#1c4a4a" />
        </linearGradient>
        <linearGradient id="sb-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#9fd8cf" stop-opacity="0" />
          <stop offset="0.5" stop-color="#9fd8cf" stop-opacity="0.22" />
          <stop offset="1" stop-color="#9fd8cf" stop-opacity="0" />
        </linearGradient>
        <!-- Perspective atmosphérique : cime plus claire, pied dans l'ombre, chaque rangée plus sombre que la précédente -->
        <linearGradient id="sb-tree-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2c5f5a" /><stop offset="1" stop-color="#153230" />
        </linearGradient>
        <linearGradient id="sb-tree-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#173c3b" /><stop offset="1" stop-color="#0a1f20" />
        </linearGradient>
        <linearGradient id="sb-tree-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b1d1c" /><stop offset="1" stop-color="#030b0a" />
        </linearGradient>
        <!-- Sols : ils naissent en fondu (transparent -> plein) pour ne laisser aucune ligne horizontale -->
        <linearGradient id="sb-gnd-far" gradientUnits="userSpaceOnUse" x1="0" y1="600" x2="0" y2="900">
          <stop offset="0" stop-color="#153230" stop-opacity="0" /><stop offset="0.5" stop-color="#153230" />
        </linearGradient>
        <linearGradient id="sb-gnd-mid" gradientUnits="userSpaceOnUse" x1="0" y1="680" x2="0" y2="900">
          <stop offset="0" stop-color="#0a1f20" stop-opacity="0" /><stop offset="0.5" stop-color="#0a1f20" />
        </linearGradient>
        <linearGradient id="sb-gnd-near" gradientUnits="userSpaceOnUse" x1="0" y1="740" x2="0" y2="900">
          <stop offset="0" stop-color="#030b0a" stop-opacity="0" /><stop offset="0.5" stop-color="#030b0a" />
        </linearGradient>
        <radialGradient id="sb-moonglow" cx="50%" cy="0%" r="70%">
          <stop offset="0" stop-color="#b9e6dc" stop-opacity="0.32" />
          <stop offset="1" stop-color="#b9e6dc" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="sb-firefly" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#f4ffb0" />
          <stop offset="0.3" stop-color="#d6f76a" stop-opacity="0.7" />
          <stop offset="1" stop-color="#d6f76a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sb-forest-sky)" />

      <ellipse cx="800" cy="0" rx="900" ry="520" fill="url(#sb-moonglow)" />

      <!-- Chaque rangée descend jusqu'au bas de l'image : plus de ciel visible sous les troncs -->
      <path :d="treesFar" fill="url(#sb-tree-far)" />
      <rect y="600" width="1600" height="8000" fill="url(#sb-gnd-far)" />
      <g class="mist"><rect y="560" width="1600" height="200" fill="url(#sb-mist)" /></g>
      <path :d="treesMid" fill="url(#sb-tree-mid)" />
      <rect y="680" width="1600" height="8000" fill="url(#sb-gnd-mid)" />
      <g class="mist m2"><rect y="680" width="1600" height="200" fill="url(#sb-mist)" /></g>
      <path :d="treesNear" fill="url(#sb-tree-near)" />
      <rect y="740" width="1600" height="8000" fill="url(#sb-gnd-near)" />

      <g>
        <g v-for="(f, i) in fireflies" :key="i" class="firefly" :style="{ animationDelay: f.d + 's' }">
          <circle :cx="f.x" :cy="f.y" r="14" fill="url(#sb-firefly)" />
        </g>
      </g>
    </svg>

    <!-- MONTAGNES (projets) puis LAC et rive (fin de page) : la scène fait 200 % de l'écran et se lit de haut en bas -->
    <svg ref="lake" class="scene soft off" viewBox="0 0 1600 1290" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a1030" stop-opacity="0.6" />
          <stop offset="0.25" stop-color="#0a1030" />
          <stop offset="0.5" stop-color="#3a2a5c" />
          <stop offset="0.8" stop-color="#d9743f" />
          <stop offset="1" stop-color="#f2a65a" />
        </linearGradient>
        <linearGradient id="sb-water" gradientUnits="userSpaceOnUse" x1="0" y1="780" x2="0" y2="1290">
          <stop offset="0" stop-color="#f2a65a" />
          <stop offset="0.25" stop-color="#8a4f6a" />
          <stop offset="0.7" stop-color="#1e1a40" />
          <stop offset="1" stop-color="#0d0d24" />
        </linearGradient>
        <linearGradient id="sb-refl-fade" gradientUnits="userSpaceOnUse" x1="0" y1="780" x2="0" y2="920">
          <stop offset="0" stop-color="#fff" /><stop offset="1" stop-color="#000" />
        </linearGradient>
        <mask id="sb-refl-mask"><rect y="780" width="1600" height="150" fill="url(#sb-refl-fade)" /></mask>
        <linearGradient id="sb-shore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#241a2e" /><stop offset="1" stop-color="#0c0810" />
        </linearGradient>
        <mask id="sb-moon-mask">
          <rect x="1380" y="120" width="140" height="120" fill="#fff" />
          <circle cx="1438" cy="170" r="32" fill="#000" />
        </mask>
      </defs>

      <rect width="1600" height="780" fill="url(#sb-sky)" />
      <!-- Lune : croissant dans le ciel, au-dessus des montagnes -->
      <g transform="translate(-228 -20)">
        <g class="moon">
          <g mask="url(#sb-moon-mask)">
            <circle cx="1450" cy="180" r="34" fill="#e3e0d8" />
          </g>
        </g>
      </g>
      <path :d="mountainsBack" fill="#5a3d72" />
      <path :d="mountainsFront" fill="#3a2650" />

      <rect y="780" width="1600" height="8000" fill="url(#sb-water)" />
      <!-- Reflet des montagnes : aplati et estompé, il ne descend pas au-delà de l'horizon proche -->
      <g mask="url(#sb-refl-mask)">
        <g opacity="0.3" transform="translate(0 780) scale(1 -0.4) translate(0 -780)">
          <path :d="mountainsBack" fill="#5a3d72" />
          <path :d="mountainsFront" fill="#3a2650" />
        </g>
      </g>
      <!-- Rive : sable sombre, liseré d'écume, sapins (calée sur le bas de la scène, qui change de hauteur) -->
      <g ref="shore">
      <path d="M0 1170Q300 1140 620 1175T1200 1165T1600 1155V1290H0Z" fill="url(#sb-shore)" />
      <path d="M0 1170Q300 1140 620 1175T1200 1165T1600 1155" fill="none" stroke="#ffd9a8" stroke-opacity="0.22" stroke-width="3" />
      <path :d="shoreTrees" fill="#0c0810" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.scroll-bg {
  /* Dans le document (pas fixe) : le fond défile avec le contenu, par le scroll natif */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* Au-dessus des étoiles (-3), sous la nebula (-1) : le globe et les décors masquent les particules */
  z-index: -2;
  pointer-events: none;
  overflow: hidden;
}

/* top, height et viewBox sont posés par le script, à hauteur de la section de chaque scène */
.scene {
  position: absolute;
  left: 0;
  width: 100%;
}

/* Bord haut estompé : la scène naît dans la précédente, sans ligne de coupure */
.scene.soft {
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 8%);
  mask-image: linear-gradient(to bottom, transparent, #000 8%);
}
/* La forêt s'estompe aussi par le bas, sous le lac */
.scene.soft.fade-bottom {
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 8%, #000 80%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 8%, #000 80%, transparent);
}
/* Scène hors écran : cachée, animations en pause */
.scene.off {
  visibility: hidden;
}
.scene.off :deep(*) {
  animation-play-state: paused;
}
.moon {
  animation: moon 30s ease-in-out infinite alternate;
}
.mist {
  animation: drift 30s ease-in-out infinite alternate;
}
.mist.m2 {
  animation-duration: 42s;
  animation-direction: alternate-reverse;
}
.firefly {
  animation: firefly 9s ease-in-out infinite;
}

@keyframes drift {
  from { transform: translateX(-30px); }
  to { transform: translateX(30px); }
}
@keyframes moon {
  from { transform: translate(-8px, 4px); }
  to { transform: translate(8px, -4px); }
}
@keyframes firefly {
  0%, 100% { transform: translate(0, 0); opacity: 0.1; }
  25% { opacity: 1; }
  50% { transform: translate(30px, -24px); opacity: 0.3; }
  75% { opacity: 0.9; }
}

@media (prefers-reduced-motion: reduce) {
  .moon, .mist, .firefly {
    animation: none;
  }
}
</style>
