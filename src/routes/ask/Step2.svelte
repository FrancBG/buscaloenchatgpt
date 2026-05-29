<script lang="ts">
	let className: string | undefined = undefined
	export { className as class }

	/** Texto para el copy del paso (el submit en receptor es solo icono). */
	export let submitLabel = 'el botón de enviar'
</script>

<div class={className}>
	<h2 class="text-lg font-semibold">Paso 2 — el ritual</h2>
	<p class="mt-1 text-meme-muted dark:text-memeDark-muted">
		Ahora el cursor va hacia <em class="font-semibold text-meme-ink dark:text-memeDark-ink"
			>{submitLabel}</em
		>
		como si fuera la primera vez que alguien abre un chat de IA.
	</p>
</div>
