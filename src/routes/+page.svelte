<script lang="ts">
	import { base } from '$app/paths'
	import { page } from '$app/stores'
	import Form from '$lib/components/Form.svelte'
	import { buildAskPath, buildAskShareUrl } from '$lib/buildAskShareUrl.js'
	import { copyTextToClipboard } from '$lib/copyToClipboard.js'
	import { pickMemePhrase } from '$lib/memePhrases.js'
	import { onMount } from 'svelte'

	let meme = ''
	onMount(() => {
		meme = pickMemePhrase()
	})

	let input: HTMLInputElement | undefined = undefined
	let shareUrl: string | null = null
	let visualizePath: string | null = null
	let copyFeedback: 'ok' | 'fail' | null = null

	function onQuerySubmit(q: string) {
		copyFeedback = null
		const trimmed = q.trim()
		if (!trimmed) {
			shareUrl = null
			visualizePath = null
			return
		}
		shareUrl = buildAskShareUrl($page.url.origin, base, trimmed)
		visualizePath = buildAskPath(base, trimmed)
	}

	async function copyShareUrl() {
		if (!shareUrl) return
		copyFeedback = (await copyTextToClipboard(shareUrl)) ? 'ok' : 'fail'
	}
</script>

<div class="flex w-full flex-col items-center gap-10 py-6 sm:py-12">
	<div class="max-w-2xl text-center">
		<h1
			class="text-balance text-3xl font-semibold tracking-tight text-meme-ink dark:text-memeDark-ink sm:text-4xl"
		>
			¿Qué quieres que ChatGPT le explique por ti?
		</h1>
		{#if meme}
			<p
				class="mt-5 text-pretty text-base leading-relaxed text-meme-muted dark:text-memeDark-muted"
			>
				{meme}
			</p>
		{/if}
	</div>

	<div class="flex w-full max-w-2xl flex-col items-center gap-4">
		<Form
			action="{base}/ask"
			bind:input
			class="w-full"
			for="home-q"
			preventSubmit={true}
			{onQuerySubmit}
		/>

		{#if shareUrl && visualizePath}
			<div class="flex w-full flex-col items-center gap-4">
				<div
					class="flex w-full flex-row items-center gap-3 rounded-full border border-meme-line bg-meme-surface px-4 py-3 shadow-sm dark:border-memeDark-line dark:bg-memeDark-chip"
				>
					<input
						readonly
						value={shareUrl}
						aria-label="Enlace compartible"
						class="w-full bg-transparent text-sm text-meme-ink outline-none dark:text-memeDark-ink"
					/>
				</div>
				<div class="flex flex-wrap items-center justify-center gap-3">
					<a
						href={visualizePath}
						class="rounded-full bg-meme-btn px-8 py-3 text-sm font-semibold text-meme-onBtn shadow-sm transition hover:opacity-90 dark:bg-memeDark-btn dark:text-memeDark-onBtn"
					>
						Visualizar
					</a>
					<button
						type="button"
						on:click={copyShareUrl}
						class="rounded-full border border-meme-line bg-meme-surface px-8 py-3 text-sm font-semibold text-meme-ink shadow-sm transition hover:border-meme-muted/40 dark:border-memeDark-line dark:bg-memeDark-chip dark:text-memeDark-ink dark:hover:border-memeDark-muted/40"
					>
						Copiar
					</button>
				</div>
				{#if copyFeedback === 'ok'}
					<p class="text-sm text-meme-muted dark:text-memeDark-muted">Enlace copiado al portapapeles.</p>
				{:else if copyFeedback === 'fail'}
					<p class="text-sm text-meme-muted dark:text-memeDark-muted">
						No se pudo copiar; selecciona el enlace de arriba manualmente.
					</p>
				{/if}
			</div>
		{/if}
	</div>
</div>
