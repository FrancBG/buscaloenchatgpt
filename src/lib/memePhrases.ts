/** Frases meme para la home; ampliar editando solo este array. */
export const MEME_PHRASES: readonly string[] = [
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

export function pickMemePhrase(): string {
	const i = Math.floor(Math.random() * MEME_PHRASES.length)
	const phrase = MEME_PHRASES[i]
	if (phrase !== undefined) return phrase
	return MEME_PHRASES[0] ?? 'Literalmente tardabas menos preguntando a ChatGPT.'
}
