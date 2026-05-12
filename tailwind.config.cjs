const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{cjs,css,html,js,postcss,svelte,ts}',
		'./node_modules/@natoboram/heroicons.svelte/**/*.{cjs,css,html,js,postcss,svelte,ts}',
	],
	darkMode: 'class',
	plugins: [],
	theme: {
		extend: {
			colors: {
				meme: {
					surface: '#ffffff',
					ink: '#171717',
					muted: '#8e8e8e',
					line: '#e5e5e5',
					chip: '#f4f4f4',
					/** Botón primario (relleno oscuro en tema claro) */
					btn: '#000000',
					onBtn: '#ffffff',
				},
				memeDark: {
					surface: '#212121',
					ink: '#fafafa',
					muted: '#a1a1aa',
					line: '#404040',
					chip: '#2d2d2d',
					btn: '#fafafa',
					onBtn: '#171717',
				},
			},
			fontFamily: {
				sans: ['Arimo', ...defaultTheme.fontFamily.sans],
			},
		},
	},
}
