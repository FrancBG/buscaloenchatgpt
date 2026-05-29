<script lang="ts">
	import { base } from '$app/paths'
	import { page } from '$app/stores'
	import Form from '$lib/components/Form.svelte'
	import MemeHero from '$lib/components/MemeHero.svelte'
	import MemePageShell from '$lib/components/MemePageShell.svelte'
	import { buildAskPath, buildAskShareUrl } from '$lib/buildAskShareUrl.js'
	import { HOME_TITLE } from '$lib/copy.js'
	import { copyTextToClipboard } from '$lib/copyToClipboard.js'
	import { CHAT_COMPOSER_BAR_CLASS } from '$lib/components/chatComposerBar.js'

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

<MemePageShell>
	<MemeHero slot="hero" title={HOME_TITLE} phraseScope="generator" />

	{#if !shareUrl}
		<Form
			action="{base}/ask"
			bind:input
			class="w-full"
			for="home-q"
			preventSubmit={true}
			variant="generator"
			{onQuerySubmit}
		/>
	{/if}

	{#if shareUrl && visualizePath}
		<div class="flex w-full flex-col items-center gap-4">
			<div class="{CHAT_COMPOSER_BAR_CLASS}">
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
</MemePageShell>
