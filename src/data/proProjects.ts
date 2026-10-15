// Données communes aux deux langues ; badge, titres et textes sont dans
// src/i18n/*.js : t.pro.groups[id] pour un cadre, t.pro.projects[id] pour un
// projet affiché à l'intérieur d'un cadre
export interface ProProject {
  id: string
  techs: string[]
  link?: string
}

export interface ProGroup {
  id: string
  techs?: string[]
  projects?: ProProject[]
}

export const proGroups: ProGroup[] = [
  {
    id: 'mission',
    projects: [
      {
        id: 'mis',
        link: 'https://mis.lawmission.net/',
        techs: ['Astro', 'Sanity', 'Tailwind CSS', 'Netlify', 'Pagefind', 'TypeScript']
      },
      // Outil interne : pas de lien public
      {
        id: 'fdp',
        techs: ['Google Apps Script', 'WordPress', 'PHP', 'Vitest']
      }
    ]
  },
  {
    id: 'runeado',
    techs: ['AdonisJS 6', 'TypeScript', 'Lucid ORM', 'Edge', 'VineJS', 'MySQL']
  }
]
