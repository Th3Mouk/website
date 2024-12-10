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
					"primary": "#2563eb",          // Blue-600 pour plus de contraste
					"secondary": "#0284c7",        // Sky-600
					"accent": "#0891b2",           // Cyan-600
					"neutral": "#1e293b",          // Slate-800
					"base-100": "#ffffff",         // White
					"base-200": "#f8fafc",         // Slate-50
					"base-300": "#f1f5f9",         // Slate-100
					"base-content": "#1e293b",     // Slate-800
					"info": "#3b82f6",             // Blue-500
					"success": "#22c55e",          // Green-500
					"warning": "#f59e0b",          // Amber-500
					"error": "#ef4444",            // Red-500
					"primary-content": "#ffffff",   // White
				},
				dark: {
					"primary": "#60a5fa",          // Blue-400
					"secondary": "#38bdf8",        // Sky-400
					"accent": "#22d3ee",           // Cyan-400
					"neutral": "#f8fafc",          // Slate-50
					"base-100": "#0f172a",         // Slate-900
					"base-200": "#1e293b",         // Slate-800
					"base-300": "#334155",         // Slate-700
					"base-content": "#f8fafc",     // Slate-50
					"info": "#60a5fa",             // Blue-400
					"success": "#4ade80",          // Green-400
					"warning": "#fbbf24",          // Amber-400
					"error": "#f87171",            // Red-400
					"primary-content": "#0f172a",   // Slate-900
				}
			}
		]
	}
}
