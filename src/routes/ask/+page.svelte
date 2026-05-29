<script lang="ts">
	import { goto } from '$app/navigation'
	import { base } from '$app/paths'
	import { page } from '$app/stores'
	import Form from '$lib/components/Form.svelte'
	import MemeHero from '$lib/components/MemeHero.svelte'
	import MemePageShell from '$lib/components/MemePageShell.svelte'
	import { copyTextToClipboard } from '$lib/copyToClipboard.js'
	import { ASK_TITLE, CLIPBOARD_FAIL, CLIPBOARD_OK } from '$lib/copy.js'
	import { CHAT_SUBMIT_ORIGIN } from '$lib/config.js'
	import { ArrowUpLeft } from '@natoboram/heroicons.svelte/20/solid'
	import { onMount } from 'svelte'
	import Step1 from './Step1.svelte'
	import Step2 from './Step2.svelte'
	import Step3 from './Step3.svelte'

	const PHASE_PAUSE_MS = 1000
	const STEP2_PAUSE_MS = 3500

	let animationComplete = false
	let receiverPolished = false
	let showCursor = true

	function openChat() {
		window.location.assign(CHAT_SUBMIT_ORIGIN)
	}

	onMount(async () => {
		await new Promise(resolve => requestIdleCallback(resolve))

		const q = $page.url.searchParams.get('q')
		if (!q) return goto(`${base}/`)

		await move(cursor, input)
		input.focus()
		await write(q)
		await new Promise(resolve => setTimeout(resolve, PHASE_PAUSE_MS))

		step++
		await move(cursor, button)
		button.focus()
		await new Promise(resolve => setTimeout(resolve, STEP2_PAUSE_MS))

		step++
		await new Promise(resolve => setTimeout(resolve, PHASE_PAUSE_MS))

		const copied = await copyTextToClipboard(q)
		clipboardMessage = copied ? CLIPBOARD_OK : CLIPBOARD_FAIL

		animationComplete = true

		// Paso 4 interno: ocultar cursor y fijar estilos finales de la barra
		step++
		showCursor = false
		receiverPolished = true
		await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
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
	class:hidden={!showCursor}
	aria-hidden="true"
>
	<ArrowUpLeft />
</div>

<MemePageShell>
	<MemeHero slot="hero" title={ASK_TITLE} />

	<Form
		class="w-full"
		action={CHAT_SUBMIT_ORIGIN}
		preventSubmit={true}
		variant="receiver"
		bind:input
		bind:submitButton={button}
		receiverSubmitEnabled={animationComplete}
		receiverPolished={receiverPolished}
		onReceiverSubmit={openChat}
		for="ask-input"
	/>

	{#if step === 0}
		<Step1
			class="w-full rounded-2xl border border-meme-line bg-meme-chip p-5 text-meme-ink dark:border-memeDark-line dark:bg-memeDark-chip dark:text-memeDark-ink"
		/>
	{:else if step === 1}
		<Step2
			submitLabel="la flecha de enviar"
			class="w-full rounded-2xl border border-meme-line bg-meme-chip p-5 text-meme-ink dark:border-memeDark-line dark:bg-memeDark-chip dark:text-memeDark-ink"
		/>
	{:else if step === 2}
		<Step3
			{clipboardMessage}
			class="w-full rounded-2xl border border-meme-line bg-meme-chip/80 p-5 text-meme-ink dark:border-memeDark-line dark:bg-memeDark-chip/80 dark:text-memeDark-ink"
		/>
	{/if}
</MemePageShell>
