import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import AssistantChat from './AssistantChat.vue'
import fr from '../i18n/fr'

// Un faux routeur suffit : le composant ne lit que route.meta.lang
async function montage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: { template: '<div />' }, meta: { lang: 'fr' } }]
  })
  await router.push('/')
  return mount(AssistantChat, { global: { plugins: [router] }, attachTo: document.body })
}

// Laisse passer le délai de « saisie » du bot (1 s) puis le rendu
async function bavarder() {
  await vi.advanceTimersByTimeAsync(1000)
  await flushPromises()
}

describe('AssistantChat', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it("l'ouverture affiche le message de départ et bascule aria-expanded", async () => {
    const w = await montage()
    const toggle = w.get('#assistant-toggle')
    expect(toggle.attributes('aria-expanded')).toBe('false')

    await toggle.trigger('click')
    await bavarder()

    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(w.get('[role="dialog"]').text()).toContain(fr.echo.faq.start.text)
    w.unmount()
  })

  it('cliquer une option ajoute la question puis la réponse du bot', async () => {
    const w = await montage()
    await w.get('#assistant-toggle').trigger('click')
    await bavarder()

    const option = fr.echo.faq.start.options[0]
    await w.findAll('.option-chip').find((b) => b.text() === option.label)!.trigger('click')
    await bavarder()

    const texts = w.findAll('.message .bubble').map((b) => b.text())
    expect(texts).toContain(option.label)
    expect(texts).toContain((fr.echo.faq as Record<string, { text: string }>)[option.next].text)
    w.unmount()
  })

  it('ne répète jamais le même fun fact deux fois de suite', async () => {
    const w = await montage()
    await w.get('#assistant-toggle').trigger('click')
    await bavarder()

    // Le hasard est truqué pour retomber sur le fait précédent : le tirage doit être refait
    const random = vi.spyOn(Math, 'random').mockReturnValue(0)
    const vus: string[] = []
    const aller = async (label: string) => {
      await w.findAll('.option-chip').filter((b) => b.text() === label).at(-1)!.trigger('click')
      await bavarder()
    }
    await aller('Disponibilité')
    await aller('Fun fact')
    vus.push(w.findAll('.message.bot .bubble').at(-1)!.text())
    random.mockReturnValueOnce(0).mockReturnValue(0.99)
    await aller('Autre fun fact ?')
    vus.push(w.findAll('.message.bot .bubble').at(-1)!.text())

    expect(vus[0]).not.toBe(vus[1])
    w.unmount()
  })

  it('Échap ferme le chat et rend le focus au bouton', async () => {
    const w = await montage()
    await w.get('#assistant-toggle').trigger('click')
    await bavarder()

    await w.get('#assistant').trigger('keydown', { key: 'Escape' })

    expect(w.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement).toBe(w.get('#assistant-toggle').element)
    w.unmount()
  })
})
