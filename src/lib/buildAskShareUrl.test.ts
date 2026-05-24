import { describe, expect, test } from 'vitest'
import { buildAskPath, buildAskShareUrl } from './buildAskShareUrl.js'

describe('buildAskShareUrl', () => {
	test('base vacío', () => {
		expect(buildAskShareUrl('https://buscaloenchatgpt.com', '', 'test')).toBe(
			'https://buscaloenchatgpt.com/ask?q=test',
		)
	})

	test('subruta GitHub Pages', () => {
		expect(buildAskShareUrl('https://francbg.github.io', '/buscaloenchatgpt', 'hola')).toBe(
			'https://francbg.github.io/buscaloenchatgpt/ask?q=hola',
		)
	})

	test('codifica espacios y caracteres especiales', () => {
		expect(buildAskShareUrl('https://example.com', '', 'a b&c')).toBe(
			'https://example.com/ask?q=a+b%26c',
		)
	})

	test('query vacía devuelve cadena vacía', () => {
		expect(buildAskShareUrl('https://example.com', '', '   ')).toBe('')
	})
})

describe('buildAskPath', () => {
	test('path relativo con query', () => {
		expect(buildAskPath('', 'test')).toBe('/ask?q=test')
	})

	test('path relativo con base', () => {
		expect(buildAskPath('/buscaloenchatgpt', 'test')).toBe('/buscaloenchatgpt/ask?q=test')
	})
})
