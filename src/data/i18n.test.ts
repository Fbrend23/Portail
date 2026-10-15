import { describe, expect, it } from 'vitest'
import fr from '../i18n/fr'
import en from '../i18n/en'
import { projects } from './projects'
import { proGroups } from './proProjects'

// Les textes sont indexés par id : on les lit comme des dictionnaires
interface Textes {
  projects: Record<string, unknown>
  pro: {
    groups: Record<string, { features?: unknown[]; [clef: string]: unknown }>
    projects: Record<string, { points: unknown[] }>
  }
}

const langues: Record<string, Textes> = { fr, en }

describe.each(Object.entries(langues))('textes en %s', (_nom, t) => {
  it('chaque projet de la grille a ses textes', () => {
    for (const { id } of projects) {
      expect(t.projects[id], id).toMatchObject({
        title: expect.any(String),
        description: expect.any(String),
        btnText: expect.any(String)
      })
    }
  })

  it('chaque cadre pro a son badge, son titre et son introduction', () => {
    for (const { id } of proGroups) {
      expect(t.pro.groups[id], id).toMatchObject({
        badge: expect.any(String),
        places: expect.any(String),
        name: expect.any(String),
        intro: expect.any(String)
      })
    }
  })

  it('chaque projet pro a son nom, son introduction et ses points', () => {
    for (const { projects: sousProjets = [] } of proGroups) {
      for (const { id } of sousProjets) {
        expect(t.pro.projects[id], id).toMatchObject({
          name: expect.any(String),
          intro: expect.any(String),
          points: expect.arrayContaining([expect.any(String)])
        })
      }
    }
  })
})

it('les deux langues ont le même nombre de points et de fonctionnalités', () => {
  const { fr, en } = langues
  for (const { id, projects: sousProjets = [] } of proGroups) {
    expect(en.pro.groups[id].features?.length, id).toBe(fr.pro.groups[id].features?.length)
    for (const projet of sousProjets) {
      expect(en.pro.projects[projet.id].points.length, projet.id).toBe(
        fr.pro.projects[projet.id].points.length
      )
    }
  }
})
