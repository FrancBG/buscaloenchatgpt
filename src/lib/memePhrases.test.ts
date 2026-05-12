import { describe, expect, test } from 'vitest'
import { MEME_PHRASES, pickMemePhrase } from './memePhrases.js'

describe('memePhrases', () => {
	test('hay al menos 20 frases', () => {
		expect(MEME_PHRASES.length).toBeGreaterThanOrEqual(20)
	})

	test('pickMemePhrase devuelve una frase del catálogo', () => {
		for (let n = 0; n < 30; n++) {
			const p = pickMemePhrase()
			expect(MEME_PHRASES).toContain(p)
		}
	})
})
