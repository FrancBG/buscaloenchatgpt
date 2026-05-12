<script lang="ts">
	import { Brightness, brightness, toggleBrightness } from '$lib/stores/brightness.js'
	import { Moon, Sun } from '@natoboram/heroicons.svelte/24/solid'

	const icons = {
		[Brightness.dark]: Sun,
		[Brightness.light]: Moon,
	}
</script>

<header
	class="flex flex-row items-center justify-end gap-2 border-b border-meme-line px-3 py-2 dark:border-memeDark-line"
>
	<button
		type="button"
		on:click={() => {
			toggleBrightness($brightness)
		}}
		class="rounded-full p-2 text-meme-muted transition hover:bg-meme-chip hover:text-meme-ink dark:text-memeDark-muted dark:hover:bg-memeDark-chip dark:hover:text-memeDark-ink"
		aria-label="Cambiar tema"
	>
		<svelte:component this={icons[$brightness]} class="h-6 w-6" />
	</button>
</header>
