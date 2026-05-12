import { afterEach, describe, expect, test, vi } from 'vitest'
import { copyTextToClipboard } from './copyToClipboard.js'

describe('copyTextToClipboard', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
	})

	test('devuelve false si writeText lanza', async () => {
		vi.stubGlobal('navigator', {
			clipboard: {
				writeText: vi.fn().mockRejectedValue(new Error('denied')),
			},
		})
		await expect(copyTextToClipboard('hola')).resolves.toBe(false)
	})
})
