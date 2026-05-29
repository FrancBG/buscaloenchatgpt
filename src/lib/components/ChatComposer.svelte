<script lang="ts">
	import ReceiverHoverTooltip from '$lib/components/ReceiverHoverTooltip.svelte'
	import {
		ASK_SUBMIT_ARIA,
		ASK_SUBMIT_DISABLED_TITLE,
		ASK_SUBMIT_TOOLTIP_DETAIL,
		ASK_SUBMIT_TOOLTIP_LABEL,
		CREATE_LINK_LABEL,
		FAKE_HINT_INSTANT,
		FAKE_HINT_MIC,
		FAKE_HINT_PLUS,
		FAKE_INSTANT_TOOLTIP_DETAIL,
		FAKE_INSTANT_TOOLTIP_LABEL,
		FAKE_MIC_TOOLTIP_KEYS,
		FAKE_MIC_TOOLTIP_LABEL,
		FAKE_PLUS_TOOLTIP_DETAIL,
		FAKE_PLUS_TOOLTIP_LABEL,
	} from '$lib/copy.js'
	import { ArrowUp, ChevronDown, Microphone, Plus } from '@natoboram/heroicons.svelte/20/solid'

	export let variant: 'generator' | 'receiver'
	export let id: string
	export let input: HTMLInputElement | undefined = undefined
	export let submitButton: HTMLButtonElement | undefined = undefined
	export let placeholder = 'Pregunta lo que quieras'
	/** Receptor: habilita el botón circular de envío tras la animación. */
	export let receiverSubmitEnabled = false
	/** Receptor: estilos finales tipo ChatGPT (tras paso 4 interno). */
	export let receiverPolished = false
	/** Receptor: clic en la flecha de envío (abrir chat). */
	export let onReceiverSubmit: (() => void) | undefined = undefined

	let fakeHint = ''

	const barClass =
		'flex w-full max-w-2xl flex-row items-center gap-2 rounded-full border border-meme-line bg-meme-surface px-3 py-2 shadow-sm transition focus-within:border-meme-ink/20 focus-within:shadow-md hover:border-meme-muted/40 dark:border-memeDark-line dark:bg-memeDark-chip focus-within:dark:border-memeDark-ink/30 hover:dark:border-memeDark-muted/40 sm:gap-3 sm:px-4 sm:py-3'

	const iconBtnClass =
		'flex shrink-0 items-center justify-center rounded-full p-2 text-meme-ink transition hover:bg-meme-chip hover:text-meme-ink dark:text-memeDark-ink dark:hover:bg-memeDark-line dark:hover:text-memeDark-ink'

	$: receiverSendEnabledClass =
		'bg-meme-btn text-meme-onBtn shadow-sm hover:bg-neutral-800 hover:shadow-md dark:bg-memeDark-btn dark:text-memeDark-onBtn dark:hover:bg-neutral-200'

	$: receiverSendDisabledClass =
		'cursor-not-allowed bg-meme-btn/40 text-meme-onBtn/70 dark:bg-memeDark-btn/40 dark:text-memeDark-onBtn/70'

	$: receiverSendClass =
		'ml-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition sm:ml-1 ' +
		(receiverSubmitEnabled ? receiverSendEnabledClass : receiverSendDisabledClass)

	function showFakeHint(message: string) {
		fakeHint = message
	}
</script>

<div class="flex w-full max-w-2xl flex-col items-stretch gap-2">
	<div class={barClass}>
		{#if variant === 'receiver'}
			<div class="group relative">
				<button
					type="button"
					class={iconBtnClass}
					aria-label="Añadir"
					title={receiverPolished ? undefined : FAKE_HINT_PLUS}
					on:click={() => showFakeHint(FAKE_HINT_PLUS)}
				>
					<Plus class="h-5 w-5" />
				</button>
				{#if receiverPolished}
					<ReceiverHoverTooltip
						accent={FAKE_PLUS_TOOLTIP_LABEL}
						detail={FAKE_PLUS_TOOLTIP_DETAIL}
					/>
				{/if}
			</div>
		{:else}
			<span
				class="flex shrink-0 items-center justify-center p-2 text-meme-muted dark:text-memeDark-muted"
				aria-hidden="true"
			>
				<Plus class="h-5 w-5" />
			</span>
		{/if}

		<input
			{id}
			aria-label="Tu pregunta"
			autocapitalize="none"
			autocomplete="off"
			autocorrect="off"
			bind:this={input}
			class="min-w-0 flex-1 bg-transparent text-meme-ink outline-none placeholder:text-meme-muted dark:text-memeDark-ink dark:placeholder:text-memeDark-muted"
			maxlength="2048"
			name="q"
			spellcheck="false"
			{placeholder}
			title="Tu pregunta"
			type="text"
		/>

		{#if variant === 'generator'}
			<button
				bind:this={submitButton}
				type="submit"
				class="shrink-0 rounded-full bg-meme-btn px-4 py-2 text-sm font-semibold text-meme-onBtn shadow-sm transition hover:opacity-90 dark:bg-memeDark-btn dark:text-memeDark-onBtn sm:px-5 sm:py-2.5"
			>
				{CREATE_LINK_LABEL}
			</button>
		{:else}
			<div class="flex shrink-0 flex-row items-center gap-0.5 sm:gap-1">
				<div class="group relative">
					<button
						type="button"
						class="flex items-center gap-0.5 rounded-full px-2 py-1.5 text-sm font-medium text-meme-ink transition hover:bg-meme-chip dark:text-memeDark-ink dark:hover:bg-memeDark-line sm:px-3"
						aria-label="Modelo Instant"
						title={receiverPolished ? undefined : FAKE_HINT_INSTANT}
						on:click={() => showFakeHint(FAKE_HINT_INSTANT)}
					>
						Instant
						<ChevronDown class="h-4 w-4 text-meme-muted dark:text-memeDark-muted" />
					</button>
					{#if receiverPolished}
						<ReceiverHoverTooltip
							accent={FAKE_INSTANT_TOOLTIP_LABEL}
							detail={FAKE_INSTANT_TOOLTIP_DETAIL}
						/>
					{/if}
				</div>
				<div class="group relative">
					<button
						type="button"
						class={iconBtnClass}
						aria-label="Micrófono"
						on:click={() => showFakeHint(FAKE_HINT_MIC)}
					>
						<Microphone class="h-5 w-5" />
					</button>
					{#if receiverPolished}
						<ReceiverHoverTooltip
							accent={FAKE_MIC_TOOLTIP_LABEL}
							detail={FAKE_MIC_TOOLTIP_KEYS}
						/>
					{/if}
				</div>
				<div class="group relative">
					<button
						bind:this={submitButton}
						type="button"
						disabled={!receiverSubmitEnabled}
						aria-disabled={!receiverSubmitEnabled}
						aria-label={ASK_SUBMIT_ARIA}
						title={receiverSubmitEnabled ? ASK_SUBMIT_ARIA : ASK_SUBMIT_DISABLED_TITLE}
						tabindex={receiverSubmitEnabled ? 0 : -1}
						class={receiverSendClass}
						on:click={() => receiverSubmitEnabled && onReceiverSubmit?.()}
					>
						<ArrowUp class="h-5 w-5" />
					</button>
					{#if receiverPolished && receiverSubmitEnabled}
						<ReceiverHoverTooltip
							accent={ASK_SUBMIT_TOOLTIP_LABEL}
							detail={ASK_SUBMIT_TOOLTIP_DETAIL}
						/>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	{#if variant === 'receiver' && fakeHint}
		<p
			class="px-2 text-center text-sm text-meme-muted dark:text-memeDark-muted"
			role="status"
		>
			{fakeHint}
		</p>
	{/if}
</div>
