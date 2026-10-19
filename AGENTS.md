# AGENTS.md — working on marodon.com

Instructions for any agent (or human) extending this site. Read this before
adding pages, projects, or translations. The goal is **bilingual (FR/EN)
content that Google indexes and ranks well.**

## Stack

- **Astro 6** (static output) · **Tailwind v4**, CSS-first (no JS config, no
  component library) · MDX + RSS for the blog.
- Self-hosted fonts, no CDN: Atkinson Hyperlegible Next (sans) + JetBrains
  Mono.
- Node ≥ 22.

```bash
npm run dev      # local dev server (http://localhost:4321) — drafts visible
npm run build    # production build (also the best i18n/SEO sanity check)
npm run check    # astro check (types + template diagnostics) — run before commit
npm run lint     # eslint --fix
npm run format   # prettier
```

Match the existing voice: technical, sober, no buzzwords, code-comment
kickers (`// …`).

## Design system

The code is the source of truth: `src/styles/tokens.css` for values,
`src/components/ui/*` for components. A browsable reference (tokens per theme,
component previews, usage rules) is kept **privately** outside the site — never
publish a design-system page on marodon.com. Ask Jérémy for access if you need
it; otherwise read the files below.

| Layer      | Where                                     | Rule                                                                |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------- |
| Primitives | `src/styles/tokens.css` → `:root`         | Raw palette (`--blue-500`…). **No utilities** — never use directly. |
| Semantic   | `src/styles/tokens.css` → `@theme static` | Roles → utilities (`bg-canvas`, `text-fg-muted`, `border-line`…).   |
| Dark theme | `[data-theme='dark']` in `tokens.css`     | Overrides semantic values only.                                     |
| Utilities  | `src/styles/global.css` (`@utility`)      | `container-content`, `bg-blueprint`, `text-label`, `link-overlay`…  |
| Article    | `src/styles/prose.css`                    | `.prose-article` typography + Shiki dual theme.                     |
| Components | `src/components/ui/*`                     | Named variants only — don't pass colour classes from outside.       |

Tailwind's default palette and text sizes are wiped (`--color-*: initial`,
`--text-*: initial`): only the site's roles and its type scale (`text-display`,
`text-h1`…`text-h4`, `text-lead`, `text-body`, `text-sm`, `text-mono-sm`,
`text-micro`) exist. Need a new colour role? Add a primitive, then a semantic
token (+ its dark value) with a comment stating its role.

Building a page: `PageHero` (the single `<h1>`), then `Section` +
`SectionHeader` bands (alternate `tone="subtle"`), cards from `Card`, and
close with `ContactCta`. Icons: `components/icons/Icon.astro` (paths in
`icons.ts`).

Gotchas:

- Base classes of a primitive set `display` (e.g. `Button` is `inline-flex`).
  To hide one responsively, use a max-variant (`max-lg:hidden`), not
  `hidden lg:inline-flex` — both utilities have the same specificity.
- Don't name a component prop `as`: Astro's compiler then drops the `Props`
  typing. Use `tag`.

## Internationalization (i18n)

### Routing model

- **French is the default locale** and is served at the root with **no prefix**
  (`/`, `/formation`, `/projets`).
- **English lives under `/en/`** (`/en/projects`).
- Slugs are **localized for SEO** (`/projets` ↔ `/en/projects`), not just
  prefixed. The mapping is declared explicitly in `src/i18n/ui.ts` → `ROUTES`.
- Config lives in `astro.config.mjs` (`i18n` block + `sitemap({ i18n })`).
  Adding locales there does **not** move existing files — you create route
  files yourself.

### Where things live

| Concern                                                                               | File                                                                                  |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Locale list, default, `ROUTES` map, shared UI strings (`nav.*`, `footer.*`, `lang.*`) | `src/i18n/ui.ts`                                                                      |
| Helpers: `getLangFromUrl`, `useTranslations`, `ogLocale`, `htmlLang`                  | `src/i18n/utils.ts`                                                                   |
| Per-page long-form copy                                                               | **next to the page** (a local `copy` object, see `src/components/ProjectsPage.astro`) |
| SEO `<head>`: canonical, hreflang, OG, Twitter, JSON-LD                               | `src/components/BaseHead.astro`                                                       |
| `<html lang>`, passes `lang`/`alternates`/`jsonLd` down                               | `src/layouts/BaseLayout.astro`                                                        |
| Header nav + language switcher                                                        | `src/components/Header.astro`                                                         |
| Footer                                                                                | `src/components/Footer.astro`                                                         |
| Blog templates (index, post, cards, ToC) + helpers                                    | `src/components/blog/*`, `src/lib/blog.ts`                                            |

**Convention:** shared chrome (nav, footer, switcher) → `ui.ts` dictionary,
accessed via `t('key')`. Page body content → a local `copy = { fr, en }`
object in that page's component, so a content edit touches one file.

### Language switcher

The switcher renders **only when a page passes `alternates`** (a locale→path
map). FR-only pages omit it and emit no hreflang — that is correct: never claim
an alternate that does not exist.

## SEO — what's automatic vs. your job

`BaseLayout` → `BaseHead` already emit, for every page:

- `<title>`, `<meta name="description">`, canonical URL
- Open Graph + Twitter cards, `og:locale` (+ `og:locale:alternate`)
- `hreflang` alternates **+ `x-default`** (when `alternates` is passed)
- a JSON-LD `<script>` (when `jsonLd` is passed)
- a multilingual `sitemap-index.xml` (via `@astrojs/sitemap`)
- `public/robots.txt` points crawlers at the sitemap.
- `<link rel="alternate" type="application/rss+xml">` to the locale's blog feed
- `og:type=article` + `article:*` tags (when `article` is passed — blog posts)
- `<meta name="robots" content="noindex">` (when `noindex` is passed). Also add
  the path to `NOINDEX_PATHS` in `astro.config.mjs` so the sitemap skips it.

**Your checklist when adding/translating content:**

1. Give each page a **unique, localized** `title` (~50–60 chars) and
   `description` (~150–160 chars) with natural keywords. Pass them to
   `BaseLayout`.
2. Pass `lang` and `alternates` so hreflang + the switcher work.
3. Provide **JSON-LD** appropriate to the page (`CollectionPage`, `Article`,
   `Person`, `SoftwareApplication`/`VideoGame`, `BreadcrumbList`…). Build it
   from data, set `inLanguage`.
4. One `<h1>` per page; logical `<h2>`/`<h3>` order.
5. Real `alt` text on meaningful images (`alt=""` only for decorative ones).
6. Use localized slugs in `ROUTES` (English slugs for English pages).
7. Keep FR and EN **semantically equivalent** — don't ship a thin translation.
8. Run `npm run build` and confirm both URLs render and the sitemap lists them.

## Write a blog post

Posts are MDX files in **`src/content/blog/<lang>/<slug>.mdx`** — the folder is
the locale, the file name is the URL (`/blog/<slug>/`, `/en/blog/<slug>/`).
Frontmatter is validated by `src/content.config.ts`:

```yaml
---
title: 'Vues matérialisées PostgreSQL : les gérer comme du code' # ≤ 60 chars
description: '150–160 chars: what Google shows under the title.'
pubDate: 2026-10-19
updatedDate: 2026-11-02 # optional
tags: ['postgresql', 'symfony'] # lowercase, first = main topic
draft: true # rendered by `astro dev` only, never built
translationKey: matviews # same value on the FR + EN versions
---
```

- `<Callout type="note|tip|warning|danger" title="…">` works in MDX without an
  import. Code fences are highlighted by Shiki (light + dark themes).
- Start with a strong first paragraph: it is styled as the standfirst.
- Use `##` / `###` only — they build the table of contents.
- Put TODOs in YAML comments (`# TODO`) in the frontmatter, not in
  `{/* */}` MDX comments: Prettier's MDX parser mangles those.
- The blog index, nav link, home "latest posts" band and RSS feed update
  themselves. While a locale has no published post, its nav link is hidden
  and the index renders an empty state with `noindex`.
- `src/content/blog/fr/anatomie-d-un-article.mdx` is the visual test bench of
  every element (draft) — check it in both themes after touching
  `prose.css`.

## Add a project

Projects are data-driven. Edit **`src/data/projects.ts`** only — the page
renders itself.

```ts
{
  slug: 'my-project',          // stable, URL-safe id
  name: 'My Project',          // brand name (not translated)
  domain: 'app.example.com',   // optional mono chip (domain or package name)
  status: 'active',            // 'active' | 'maintenance' | 'paused'
  since: '2025',               // optional
  tech: ['Astro', 'TypeScript'], // optional; empty array hides the row
  tagline: { fr: '…', en: '…' },     // one line, both locales required
  description: { fr: '…', en: '…' }, // 1–2 sentences, both locales required
  links: [                     // optional; first is primary (button + JSON-LD url)
    { url: 'https://app.example.com/', kind: 'site' },   // kind: 'site' | 'github' | 'package'
    // { url: 'https://github.com/me/repo', kind: 'github' },
  ],
}
```

Both `fr` and `en` strings are **required** by the types — keep them
equivalent. `kind` picks the button label + icon automatically (`site` →
"Visit the site", `github` → "View on GitHub"); add a `label: { fr, en }` to a
link to override (e.g. to tell a library apart from its bundle). `links` is
**optional**: a project with no public repo/download yet (e.g. an unreleased
app) omits it — the card then renders without a button and deep-links to itself
(`#slug`) in the JSON-LD. Add the `links` array once it ships. The entry
automatically feeds the cards **and** the JSON-LD `ItemList`. Keep descriptions
concrete (real value, not marketing) — that text is what Google indexes.

> The `golf` entry has a `TODO(content)` to enrich (launch year, tech stack,
> a sharper description / screenshot). Fill it when the info is available.

## Add a bilingual page

1. **Declare the route** in `src/i18n/ui.ts` → `ROUTES`, with localized slugs.
   Keep the trailing slash so hreflang/JSON-LD match Astro's canonical URLs:
   ```ts
   export const ROUTES = {
     projects: { fr: '/projets/', en: '/en/projects/' },
     services: { fr: '/services/', en: '/en/services/' }, // new
   } as const;
   ```
2. **Build the content once** in a shared component that takes `lang: Lang`
   (mirror `src/components/ProjectsPage.astro`): a local `copy = { fr, en }`
   object, `alternates = localePaths('services')`, a `jsonLd` object, wrapped in
   `<BaseLayout title description lang alternates jsonLd>`.
3. **Create the two thin route files** that just pick the locale:
   - `src/pages/services.astro` → `<ServicesPage lang="fr" />`
   - `src/pages/en/services.astro` → `<ServicesPage lang="en" />`
4. **Add it to navigation** in `src/components/Header.astro` and
   `src/components/Footer.astro` (use `ROUTES.services[lang]` + a `nav.*` key
   added to the `ui` dictionary in both locales).
5. `npm run build` and verify both URLs + sitemap + hreflang.

The sitemap pairs locales by matching path segments, so with localized slugs it
won't auto-pair `/projets` with `/en/projects` — that's fine: the authoritative
hreflang signal is the `<head>` block emitted by `BaseHead`, which **is**
accurate because it's built from `ROUTES`.

## Bilingual pages today

Every public page is bilingual: home (`/` ↔ `/en/`), training (`/formation/` ↔
`/en/training/`), about (`/about/` ↔ `/en/about/`), projects and blog. Each
follows the pattern above — a `lang`-aware component in `src/components/`
(`HomePage`, `TrainingPage`, `AboutPage`, `ProjectsPage`) plus two thin route
files — and the header/footer nav uses `ROUTES.<key>[lang]` throughout.

- **Testimonials stay in French on English pages**: they are verbatim LinkedIn
  quotes (`src/data/testimonials.ts`, and the soft-skill proofs in
  `AboutPage.astro`). `Testimonial.astro` marks them `lang="fr"`; keep doing so
  for any new quoted French text, and never translate them.
- `/404` is a single page for both locales (static hosts serve one
  `404.html`), so it shows both languages and links to the French pages.
- New pages must ship both locales from the start; a temporarily FR-only page
  omits `alternates` (no switcher, no hreflang) — never claim an alternate
  that does not exist.
