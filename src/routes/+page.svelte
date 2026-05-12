<script lang="ts">
	import { base } from '$app/paths'
	import Form from '$lib/components/Form.svelte'
	import { pickMemePhrase } from '$lib/memePhrases.js'
	import { onMount } from 'svelte'

	let meme = ''
	onMount(() => {
		meme = pickMemePhrase()
	})

	let input: HTMLInputElement | undefined = undefined
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

	<Form action="{base}/ask" bind:input class="w-full max-w-2xl" for="home-q" />
</div>
