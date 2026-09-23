// Données communes aux deux langues ; titres, descriptions et boutons sont
// dans src/i18n/*.js, sous la même clé (id)
export const projects = [
  {
    id: 's-photo',
    link: 'https://photographie.brendanfleurdelys.ch/',
    theme: 'forest',
    image: '/assets/cartes/s-photo.webp',
    tags: ['Astro', 'Directus']
  },
  {
    id: 's-prodysos',
    link: 'https://prodysos.app',
    theme: 'prodysos',
    image: '/assets/cartes/s-prodysos.webp',
    tags: ['Vue', 'Supabase', 'PWA']
  },
  {
    id: 's-horaire',
    link: 'https://horaire.brendanfleurdelys.ch/',
    theme: 'flare',
    image: '/assets/cartes/s-horaire.webp',
    tags: ['Vue', 'Supabase', 'Tailwind']
  },
  {
    id: 's-fieu',
    link: 'https://maisallezfieu.be/',
    theme: 'crystal',
    image: '/assets/cartes/s-fieu.webp',
    tags: ['Astro', 'Directus', 'API Prodysos']
  },
  {
    id: 's-travel',
    link: 'https://traveldb.brendanfleurdelys.ch/',
    theme: 'sunset',
    image: '/assets/cartes/s-travel.webp',
    // Backend AdonisJS sans hébergement Node disponible pour l'instant
    paused: true,
    tags: ['Vue', 'AdonisJS', 'Leaflet']
  },
  {
    id: 's-wiki',
    link: 'https://revisions.brendanfleurdelys.ch/',
    theme: 'dream',
    image: '/assets/cartes/s-wiki.webp',
    tags: ['Vue', 'Markdown']
  },
  {
    id: 's-tanuki',
    link: 'https://tanukicode.brendanfleurdelys.ch/',
    theme: 'tanuki',
    image: '/assets/cartes/s-tanukicode.webp',
    tags: ['Vue', 'Supabase', 'Tailwind']
  },
  {
    id: 's-lunchpicker',
    link: 'https://lunch-picker-six.vercel.app/',
    theme: 'lunchpicker',
    image: '/assets/cartes/s-lunchpicker.webp',
    tags: ['Nuxt', 'Supabase', 'PWA']
  },
  {
    id: 's-matinale',
    link: 'https://matinale.brendanfleurdelys.ch/',
    theme: 'matinale',
    image: '/assets/cartes/s-matinale.webp',
    tags: ['Astro', 'Directus', 'AGY', 'Claude Code']
  }
]
