<script lang="ts">
	let className: string | undefined = undefined
	export { className as class }
</script>

<div class="flex w-full flex-col items-center gap-10 py-6 sm:py-12 {className}">
	<slot name="hero" />
	<div class="flex w-full max-w-2xl flex-col items-center gap-4">
		<slot />
	</div>
</div>
