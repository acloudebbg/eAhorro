import { test, expect } from '@playwright/test'

test.describe('Navegación básica', () => {
  test('la home carga con el título y H1 esperados', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/iAhorro/)
    await expect(page.locator('h1')).toContainText('mejor hipoteca')
  })

  test('la página de hipotecas carga', async ({ page }) => {
    await page.goto('/hipotecas')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('la página de calculadoras carga', async ({ page }) => {
    await page.goto('/calculadoras')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('la página de euribor carga', async ({ page }) => {
    await page.goto('/euribor')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('una ruta desconocida no rompe la app (fallback)', async ({ page }) => {
    const response = await page.goto('/ruta-que-no-existe')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })
})
