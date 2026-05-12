<script lang="ts">
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import '../app.postcss'
</script>

<svelte:head>
	<title>BuscaLoEnChatGPT</title>
	<meta
		name="description"
		content="Parodia tipo LMGTFY: comparte el enlace y redirige a ChatGPT con estilo."
	/>
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-meme-surface text-meme-ink dark:bg-memeDark-surface dark:text-memeDark-ink"
>
	<Header />

	<main class="container flex flex-1 flex-col justify-center px-4 pb-8 pt-4 sm:px-6">
		<slot />
	</main>

	<Footer />
</div>
