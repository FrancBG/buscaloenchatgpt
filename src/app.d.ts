// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

interface ImportMetaEnv {
	/** Optional override for ChatGPT (or compatible) submit origin, e.g. `https://chatgpt.com` */
	readonly PUBLIC_CHATGPT_ORIGIN?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
