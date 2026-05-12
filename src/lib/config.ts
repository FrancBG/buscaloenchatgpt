/** Base URL for the final GET form submit (query field `q` is appended by the browser). */
function normalizeChatOrigin(raw: string | undefined): string {
	const fallback = 'https://chatgpt.com'
	if (raw === undefined || raw.trim() === '') return fallback
	try {
		const u = new URL(raw.trim())
		if (u.protocol !== 'https:' && u.protocol !== 'http:') return fallback
		return u.origin
	} catch {
		return fallback
	}
}

const rawOrigin = import.meta.env['PUBLIC_CHATGPT_ORIGIN'] as string | undefined
export const CHAT_SUBMIT_ORIGIN: string = normalizeChatOrigin(rawOrigin)
