<script lang="ts">
	/** Mensaje tras intentar copiar al portapapeles; vacío = estado intermedio. */
	export let clipboardMessage = ''

	let className: string | undefined = undefined
	export { className as class }
</script>

<div class={className}>
	<h2 class="text-lg font-semibold">Paso 3 — listo</h2>
	{#if clipboardMessage}
		<p
			class="mt-3 text-pretty text-base font-medium leading-relaxed text-meme-ink dark:text-memeDark-ink"
		>
			{clipboardMessage}
		</p>
	{:else}
		<p class="mt-1 text-meme-muted dark:text-memeDark-muted">Preparando el portapapeles…</p>
	{/if}
</div>
