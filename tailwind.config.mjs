/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
	],
	daisyui: {
		themes: [
			{
				light: {
					"primary": "#0ea5e9",
					"secondary": "#7dd3fc",
					"accent": "#37CDBE",
					"neutral": "#3D4451",
					"base-100": "#FFFFFF",
					"info": "#3ABFF8",
					"success": "#36D399",
					"warning": "#FBBD23",
					"error": "#F87272",
				},
				dark: {
					"primary": "#0ea5e9",
					"secondary": "#7dd3fc",
					"accent": "#37CDBE",
					"neutral": "#191D24",
					"base-100": "#2A303C",
					"info": "#3ABFF8",
					"success": "#36D399",
					"warning": "#FBBD23",
					"error": "#F87272",
				},
			},
		],
	},
}
