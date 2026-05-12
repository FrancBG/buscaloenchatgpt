<script lang="ts">
	import { MagnifyingGlass } from '@natoboram/heroicons.svelte/20/solid'

	export let id: string
	export let input: HTMLInputElement | undefined = undefined
	export let value = ''
</script>

<div
	class="flex w-full max-w-2xl flex-row items-center gap-3 rounded-full border border-meme-line bg-meme-surface px-4 py-3
			shadow-sm transition
			focus-within:border-meme-ink/20 focus-within:shadow-md
			hover:border-meme-muted/40
			dark:border-memeDark-line dark:bg-memeDark-chip
			focus-within:dark:border-memeDark-ink/30
			hover:dark:border-memeDark-muted/40
		"
>
	<MagnifyingGlass class="h-5 w-5 shrink-0 text-meme-muted dark:text-memeDark-muted" />
	<input
		{id}
		aria-label="Tu pregunta"
		autocapitalize="none"
		autocomplete="off"
		autocorrect="off"
		bind:this={input}
		bind:value
		class="w-full bg-transparent text-meme-ink outline-none placeholder:text-meme-muted dark:text-memeDark-ink dark:placeholder:text-memeDark-muted"
		maxlength="2048"
		name="q"
		spellcheck="false"
		placeholder="Pregunta lo que quieras"
		title="Tu pregunta"
		type="text"
	/>
</div>
