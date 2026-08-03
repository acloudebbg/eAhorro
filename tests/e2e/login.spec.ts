import { test, expect } from '@playwright/test'

test.describe('Login', () => {
  test('muestra el formulario de acceso por email', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Accede a tu área de cliente')).toBeVisible()
    await expect(page.getByPlaceholder('ejemplo@correo.com')).toBeVisible()
    await expect(page.getByRole('button', { name: /Enviarme enlace de acceso/i })).toBeVisible()
  })

  test('muestra error con un email inválido', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('ejemplo@correo.com').fill('correo@invalido')
    await page.getByRole('button', { name: /Enviarme enlace de acceso/i }).click()
    await expect(page.getByText('Introduce un correo electrónico válido')).toBeVisible()
  })

  test('muestra error si el email está vacío', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /Enviarme enlace de acceso/i }).click()
    await expect(page.getByText('El correo electrónico es obligatorio')).toBeVisible()
  })
})
