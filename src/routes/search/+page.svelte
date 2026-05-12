<script lang="ts">
	import { goto } from '$app/navigation'
	import { base } from '$app/paths'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	onMount(() => {
		const q = $page.url.searchParams.get('q')
		if (!q) {
			void goto(`${base}/`)
			return
		}
		const params = new URLSearchParams()
		params.set('q', q)
		void goto(`${base}/ask?${params.toString()}`)
	})
</script>

<p class="text-center text-meme-muted dark:text-memeDark-muted">Redirigiendo al meme actual…</p>
