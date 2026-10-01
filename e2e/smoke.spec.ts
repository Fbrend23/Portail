import { expect, test } from '@playwright/test'

for (const [path, lang] of [
  ['/', 'fr'],
  ['/en/', 'en']
] as const) {
  test(`la page ${path} est servie dans la bonne langue avec ses hreflang`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveCount(1)
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1)
  })
}

test('le chat Echo s’ouvre au clavier et se ferme avec Échap', async ({ page }) => {
  // Intro sautée : même effet qu'un retour sur la page pendant la session
  await page.addInitScript(() => sessionStorage.setItem('intro-vue', '1'))
  await page.goto('/')

  const toggle = page.locator('#assistant-toggle')
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(toggle).toBeFocused()
})
