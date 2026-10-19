// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeTableWrap from './src/lib/rehype-table-wrap.mjs';

// Utility / work-in-progress pages that must not be submitted to search
// engines (they also carry <meta name="robots" content="noindex">).
const NOINDEX_PATHS = ['/formation-v2/'];

// https://astro.build/config
export default defineConfig({
  site: 'https://marodon.com',
  // French is the default locale (served at the root, no URL prefix);
  // English pages live under /en/. Adding this config does not move or
  // rewrite the existing French-only pages — it enables locale-aware
  // helpers and feeds the sitemap its hreflang data. See AGENTS.md.
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    // Explicit: Astro 6.4 leaves these undefined in the resolved config and
    // @astrojs/mdx 5 then reads them as "off" (no tables, footnotes, task lists).
    gfm: true,
    smartypants: true,
    rehypePlugins: [rehypeTableWrap],
    // "Notes" reads the same in French and English.
    remarkRehype: { footnoteLabel: 'Notes' },
    // Dual-theme highlighting: Shiki emits both palettes as CSS variables
    // and src/styles/prose.css picks one from [data-theme].
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
      wrap: false,
    },
  },
  integrations: [
    mdx({ gfm: true, smartypants: true }),
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => new URL(page).pathname === path),
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
