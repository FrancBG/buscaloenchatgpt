<script lang="ts">
	import Buttons from '$lib/components/Buttons.svelte'
	import Search from '$lib/components/Search.svelte'

	let f: string
	export { f as for }

	let className: string | undefined = undefined
	export { className as class }

	export let action: string
	export let submitButton: HTMLButtonElement | undefined = undefined
	export let input: HTMLInputElement | undefined = undefined
	export let submitLabel = 'Buscarlo'
	/** Si es true, el submit no navega (útil en `/ask` para animación sin envío GET real). */
	export let preventSubmit = false

	function onSubmit(e: SubmitEvent) {
		if (preventSubmit) e.preventDefault()
	}
</script>

<form
	{action}
	autocomplete="off"
	class="flex flex-col items-center gap-4 px-4 {className}"
	method="GET"
	role="search"
	on:submit={onSubmit}
>
	<slot name="header" />
	<Search id={f} bind:input />
	<Buttons bind:submitButton label={submitLabel} />
</form>
