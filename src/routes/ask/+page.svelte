<script lang="ts">
	import { goto } from '$app/navigation'
	import { base } from '$app/paths'
	import { page } from '$app/stores'
	import Form from '$lib/components/Form.svelte'
	import { copyTextToClipboard } from '$lib/copyToClipboard.js'
	import { CHAT_SUBMIT_ORIGIN } from '$lib/config.js'
	import { ArrowUpLeft } from '@natoboram/heroicons.svelte/20/solid'
	import { onMount } from 'svelte'
	import Step1 from './Step1.svelte'
	import Step2 from './Step2.svelte'
	import Step3 from './Step3.svelte'

	const CLIPBOARD_OK =
		'Texto copiado en el portapapeles para que sólo lo tengas que pegar. Vamos que esto sabes hacerlo.'
	const CLIPBOARD_FAIL =
		'No pudimos copiar al portapapeles (permisos del navegador). Copia tú el texto del campo de arriba; te llevamos a ChatGPT igualmente.'

	onMount(async () => {
		await new Promise(resolve => requestIdleCallback(resolve))

		const q = $page.url.searchParams.get('q')
		if (!q) return goto(`${base}/`)

		await move(cursor, input)
		input.focus()
		await write(q)
		await new Promise(resolve => setTimeout(resolve, 1000))

		step++
		await move(cursor, button)
		button.focus()
		await new Promise(resolve => setTimeout(resolve, 1000))

		step++
		await new Promise(resolve => setTimeout(resolve, 400))

		const copied = await copyTextToClipboard(q)
		clipboardMessage = copied ? CLIPBOARD_OK : CLIPBOARD_FAIL

		await new Promise(resolve => setTimeout(resolve, 2800))
		window.location.assign(CHAT_SUBMIT_ORIGIN)
	})

	async function move(cursor: HTMLDivElement, target: HTMLElement) {
		return new Promise(resolve => {
			const diffX =
				target.getBoundingClientRect().left +
				target.clientWidth / 2 -
				cursor.getBoundingClientRect().left
			const diffY =
				target.getBoundingClientRect().top +
				target.clientHeight / 2 -
				cursor.getBoundingClientRect().top

			const steps = 60
			const stepX = diffX / steps
			const stepY = diffY / steps

			let tick = 0
			const interval = setInterval(frame, 1000 / 60)

			function frame() {
				if (tick >= steps) {
					clearInterval(interval)
					resolve(undefined)
				} else {
					tick++

					const top = (parseFloat(cursor.style.top) || 0) + stepY
					const left = (parseFloat(cursor.style.left) || 0) + stepX

					cursor.style.top = `${top.toString()}px`
					cursor.style.left = `${left.toString()}px`
				}
			}
		})
	}

	async function write(text: string) {
		for (const letter of text) {
			await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))
			input.value += letter
			input.scrollLeft = input.scrollWidth
		}
	}

	let button: HTMLButtonElement
	let clipboardMessage = ''
	let cursor: HTMLDivElement
	let input: HTMLInputElement
	let step = 0
</script>

<div
	bind:this={cursor}
	class="pointer-events-none absolute left-0 top-0 text-meme-ink dark:text-memeDark-ink"
>
	<ArrowUpLeft />
</div>

<div class="flex w-full flex-col items-center gap-4">
	<Form
		class="w-full max-w-2xl"
		action={CHAT_SUBMIT_ORIGIN}
		preventSubmit={true}
		bind:input
		bind:submitButton={button}
		for="ask-input"
	/>

	{#if step === 0}
		<Step1
			class="w-full max-w-2xl rounded-2xl border border-meme-line bg-meme-chip p-5 text-meme-ink dark:border-memeDark-line dark:bg-memeDark-chip dark:text-memeDark-ink"
		/>
	{:else if step === 1}
		<Step2
			{button}
			class="w-full max-w-2xl rounded-2xl border border-meme-line bg-meme-chip p-5 text-meme-ink dark:border-memeDark-line dark:bg-memeDark-chip dark:text-memeDark-ink"
		/>
	{:else if step === 2}
		<Step3
			{clipboardMessage}
			class="w-full max-w-2xl rounded-2xl border border-meme-line bg-meme-chip/80 p-5 text-meme-ink dark:border-memeDark-line dark:bg-memeDark-chip/80 dark:text-memeDark-ink"
		/>
	{/if}
</div>
