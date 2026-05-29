import { expect, test } from '@playwright/test'

test('index page has expected elements', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { level: 1 })).toContainText('ChatGPT')
	await expect(page.getByPlaceholder('Pregunta lo que quieras')).toBeVisible()
	await expect(page.getByRole('button', { name: 'Crear link' })).toBeVisible()
})

test('after Crear link hides composer and shows Copiar', async ({ page }) => {
	await page.goto('/')
	await page.getByPlaceholder('Pregunta lo que quieras').fill('hola test')
	await page.getByRole('button', { name: 'Crear link' }).click()
	await expect(page.getByPlaceholder('Pregunta lo que quieras')).not.toBeVisible()
	await expect(page.getByRole('button', { name: 'Crear link' })).not.toBeVisible()
	await expect(page.getByRole('button', { name: 'Copiar' })).toBeVisible()
})
