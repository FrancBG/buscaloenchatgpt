<script lang="ts">
	export let submitButton: HTMLButtonElement | undefined = undefined
	/** Texto del botón (y aria-label). */
	export let label = 'Buscarlo'
</script>

<button
	bind:this={submitButton}
	type="submit"
	aria-label={label}
	class="rounded-full bg-meme-btn px-8 py-3 text-sm font-semibold text-meme-onBtn
		shadow-sm transition hover:opacity-90
		dark:bg-memeDark-btn dark:text-memeDark-onBtn"
>
	{label}
</button>
