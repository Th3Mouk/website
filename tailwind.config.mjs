/**
 * Tailwind v3-style design tokens, loaded by global.css via the
 * `@config` directive (Tailwind 4 backwards compat).
 *
 * DaisyUI is configured separately via `@plugin "daisyui"` in CSS
 * (DaisyUI 5 dropped the tailwind.config.mjs plugin entry).
 *
 * Dark variant is now declared in CSS via `@custom-variant`, so the
 * `darkMode` field is no longer used.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3B82F6',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
          950: '#0A1A33',
        },
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-subtle': 'rgb(var(--color-bg-subtle) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--color-bg-elevated) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'text-subtle': 'rgb(var(--color-text-subtle) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: [
          '"JetBrains Mono Variable"',
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      fontSize: {
        display: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h1: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        h2: ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
        lead: ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.7' }],
        'mono-sm': ['0.8125rem', { lineHeight: '1.4' }],
      },
      maxWidth: {
        prose: '720px',
        content: '1200px',
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'glow-blue': '0 0 0 4px rgba(0, 102, 255, 0.15)',
      },
      animation: {
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'fade-up': 'fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
