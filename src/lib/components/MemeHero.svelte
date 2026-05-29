<script lang="ts">
	import { pickMemePhrase, type MemePhraseScope } from '$lib/memePhrases.js'
	import { onMount } from 'svelte'

	export let title: string
	export let phraseScope: MemePhraseScope = 'receiver'

	let meme = ''
	onMount(() => {
		meme = pickMemePhrase(phraseScope)
	})
</script>

<div class="max-w-2xl text-center">
	<h1
		class="text-balance text-3xl font-semibold tracking-tight text-meme-ink dark:text-memeDark-ink sm:text-4xl"
	>
		{title}
	</h1>
	{#if meme}
		<p class="mt-5 text-pretty text-base leading-relaxed text-meme-muted dark:text-memeDark-muted">
			{meme}
		</p>
	{/if}
</div>
