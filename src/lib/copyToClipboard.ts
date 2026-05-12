/** Intenta copiar `text` al portapapeles (solo en navegador con API disponible). */
export async function copyTextToClipboard(text: string): Promise<boolean> {
	if (!('clipboard' in globalThis.navigator)) return false
	try {
		await globalThis.navigator.clipboard.writeText(text)
		return true
	} catch {
		return false
	}
}
