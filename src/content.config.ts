// Content collections. Blog posts live in src/content/blog/<lang>/<slug>.mdx;
// the folder gives the locale, the file name gives the URL slug.
// See AGENTS.md → "Write a blog post".
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '{fr,en}/**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    /** <h1> and <title>. Aim for ≤ 60 characters. */
    title: z.string(),
    /** Meta description + card summary. Aim for 150–160 characters. */
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Lowercase topics, e.g. ['postgresql', 'symfony']. First one is the primary topic. */
    tags: z.array(z.string()).default([]),
    /** Drafts render in `astro dev` only — never built for production. */
    draft: z.boolean().default(false),
    /**
     * Same value on the FR and EN versions of a post to link them
     * (language switcher + hreflang). Omit for single-language posts.
     */
    translationKey: z.string().optional(),
  }),
});

export const collections = { blog };
