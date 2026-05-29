<script lang="ts">
	export let accent: string
	export let detail: string
</script>

<div
	class="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-meme-tooltip px-3 py-2 text-sm text-white shadow-lg group-hover:block dark:bg-memeDark-tooltip dark:text-white"
	role="tooltip"
>
	<span class="text-meme-tooltipAccent dark:text-memeDark-tooltipAccent">{accent}</span>
	{' '}
	<span>{detail}</span>
</div>
