export type MemePhraseScope = 'generator' | 'receiver'

/** Frases para quien crea y comparte el enlace (home). */
export const MEME_PHRASES_GENERATOR: readonly string[] = [
	'Para el que pregunta en el grupo y espera que otro haga el trabajo.',
	'Tu amigo del café: “¿Lo buscaste en ChatGPT?” — ahora con enlace.',
	'LMGTFY, edición 2026: mismo sarcasmo, otro modelo.',
	'Comparte esto y deja de ser el soporte técnico informal.',
	'Para mandárselo a quien dice “no sé de IA” con un PDF de 40 páginas.',
	'El “pregúntale a tu sobrino” pero el sobrino eres tú con un link.',
	'Cuando la respuesta correcta es “abre ChatGPT” y tú lo sabes.',
	'Ideal para el compañero que pregunta lo mismo cada lunes.',
	'Un enlace, cero explicación, máxima condescendencia amable.',
	'Para tu madre que te manda capturas de Facebook en lugar de prompts.',
	'El ritual: tú creas el link, ellos pierden 30 segundos de dignidad.',
	'De “¿me ayudas?” a “te lo mando hecho” en un clic.',
	'Para el grupo de WhatsApp que confunde Google con oráculo.',
	'Tu buena acción del día: no responder, compartir.',
	'Hecho para quien ya sabe la respuesta pero quiere que la busquen solos.',
	'El passive-aggressive del siglo XXI tiene URL.',
	'Para el que pregunta en voz alta en la reunión.',
	'Comparte y desaparece: el superpoder del enlace.',
	'Menos “te explico”, más “te mando el meme con q=”.',
	'Para convertir “no sé” en “ah, vale, ChatGPT” sin escribir tú el prompt.',
	'El enlace que tu yo del futuro mandaría a tu yo del pasado.',
	'Generador oficial de “¿Has probado preguntarle a ChatGPT?”.',
]

/** Frases para quien abre el enlace y ve la parodia (/ask). */
export const MEME_PHRASES_RECEIVER: readonly string[] = [
	'Literalmente tardabas menos preguntando a ChatGPT.',
	'Tu compañero de equipo ya lo habría resuelto con IA.',
	'Google era muy 2023.',
	'Ahora con contexto y trauma incluido.',
	'Powered by prompting dudoso.',
	'Te ahorro 14 pestañas y un hilo de Reddit.',
	'No es magia: es un modelo que a veces alucina con estilo.',
	'Tu búsqueda en tres motores distintos, en un solo meme.',
	'El RTFM moderno es “pregúntale al chat”.',
	'Cero trackers. Cero dignidad en la pregunta. Todo corazón.',
	'¿Otra vez “error 500”? Prueba con “explícamelo como si tuviera cinco años”.',
	'La IA no te juzga. (Mentira: nosotros sí, por eso estás aquí.)',
	'Comparte el enlace y haz perder el tiempo a alguien con gracia.',
	'Menos reuniones, más prompts pasivo-agresivos.',
	'Stack Overflow está llorando en un rincón.',
	'Copilot quiere saber tu ubicación.',
	'Tu yo del futuro te agradecerá este atajo.',
	'De “no sé por dónde empezar” a “no sé si esto es cierto” en un clic.',
	'El tutorial de YouTube tenía 18 minutos de intro. Esto no.',
	'Modo zen: pregunta, respira, verifica las fuentes después.',
	'Hecho con amor, sarcasmo y demasiado café.',
	'No sustituye pensar. Solo acelera el ridículo.',
]

/** @deprecated Usar MEME_PHRASES_RECEIVER */
export const MEME_PHRASES: readonly string[] = MEME_PHRASES_RECEIVER

function pickFrom(phrases: readonly string[], fallback: string): string {
	const i = Math.floor(Math.random() * phrases.length)
	const phrase = phrases[i]
	if (phrase !== undefined) return phrase
	return phrases[0] ?? fallback
}

export function pickMemePhrase(scope: MemePhraseScope = 'receiver'): string {
	if (scope === 'generator') {
		return pickFrom(
			MEME_PHRASES_GENERATOR,
			'Generador oficial de “¿Has probado preguntarle a ChatGPT?”.',
		)
	}
	return pickFrom(
		MEME_PHRASES_RECEIVER,
		'Literalmente tardabas menos preguntando a ChatGPT.',
	)
}

export function pickMemePhraseGenerator(): string {
	return pickMemePhrase('generator')
}

export function pickMemePhraseReceiver(): string {
	return pickMemePhrase('receiver')
}
