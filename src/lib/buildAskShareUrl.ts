/** URL absoluta compartible hacia `/ask?q=...` (respeta `base` de SvelteKit). */
export function buildAskShareUrl(origin: string, base: string, query: string): string {
	const q = query.trim()
	if (!q) return ''

	const params = new URLSearchParams({ q })
	return `${origin}${base}/ask?${params.toString()}`
}

/** Path relativo hacia `/ask?q=...` (para navegación en la misma app). */
export function buildAskPath(base: string, query: string): string {
	const q = query.trim()
	if (!q) return `${base}/ask`

	const params = new URLSearchParams({ q })
	return `${base}/ask?${params.toString()}`
}
