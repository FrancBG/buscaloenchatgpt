import { describe, expect, test } from 'vitest'
import {
	MEME_PHRASES_GENERATOR,
	MEME_PHRASES_RECEIVER,
	pickMemePhrase,
} from './memePhrases.js'

describe('memePhrases', () => {
	test('hay al menos 20 frases en cada catálogo', () => {
		expect(MEME_PHRASES_GENERATOR.length).toBeGreaterThanOrEqual(20)
		expect(MEME_PHRASES_RECEIVER.length).toBeGreaterThanOrEqual(20)
	})

	test('pickMemePhrase(generator) devuelve solo frases del generador', () => {
		for (let n = 0; n < 30; n++) {
			const p = pickMemePhrase('generator')
			expect(MEME_PHRASES_GENERATOR).toContain(p)
			expect(MEME_PHRASES_RECEIVER).not.toContain(p)
		}
	})

	test('pickMemePhrase(receiver) devuelve solo frases del receptor', () => {
		for (let n = 0; n < 30; n++) {
			const p = pickMemePhrase('receiver')
			expect(MEME_PHRASES_RECEIVER).toContain(p)
		}
	})
})
