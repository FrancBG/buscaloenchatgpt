import { expect, test } from '@playwright/test'

test('index page has expected elements', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { level: 1 })).toContainText('ChatGPT')
	await expect(page.getByPlaceholder('Pregunta lo que quieras')).toBeVisible()
	await expect(page.getByRole('button', { name: 'Buscarlo' })).toBeVisible()
})
