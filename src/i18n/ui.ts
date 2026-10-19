// Central i18n dictionary for shared site chrome (header nav, language
// switcher, footer, theme toggle, blog chrome). Page-specific long-form copy
// lives next to each page (e.g. the `copy` object in ProjectsPage.astro) so
// content edits stay in one file. See AGENTS.md for the full convention.

export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

/** Default locale. Served at the root with no URL prefix (e.g. `/projets`). */
export const defaultLang: Lang = 'fr';

/**
 * Canonical path for each bilingual route, per locale. This is the single
 * source of truth for cross-language links, `hreflang` alternates, the
 * sitemap pairing and the header language switcher.
 *
 * Convention: French (default) lives at the root, English under `/en/`.
 * Slugs are localized for SEO (`/projets` ↔ `/en/projects`), so they are
 * declared explicitly here rather than derived by prefixing. Paths keep a
 * trailing slash to match the canonical URLs Astro emits (directory format),
 * so hreflang / JSON-LD / canonical all agree exactly.
 *
 * To add a bilingual page, add an entry here, then create both route files
 * (see AGENTS.md → "Add a bilingual page").
 */
export const ROUTES = {
  home: { fr: '/', en: '/en/' },
  training: { fr: '/formation/', en: '/en/training/' },
  about: { fr: '/about/', en: '/en/about/' },
  projects: { fr: '/projets/', en: '/en/projects/' },
  blog: { fr: '/blog/', en: '/en/blog/' },
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Build the locale→path map for a route, for `alternates` props. */
export function localePaths(key: RouteKey): Record<Lang, string> {
  return { ...ROUTES[key] };
}

// Flat, dotted keys keep `t('nav.home')` simple. Every key must exist in
// every locale; `useTranslations` falls back to `defaultLang` if one is
// missing.
export const ui = {
  fr: {
    'nav.home': 'Accueil',
    'nav.training': 'Formations',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.primary': 'Navigation principale',
    'nav.brandHome': "Retour à l'accueil",
    'nav.openMenu': 'Ouvrir le menu',
    'nav.closeMenu': 'Fermer le menu',
    'nav.skip': 'Aller au contenu',
    'lang.switch': 'Changer de langue',
    'theme.toggle': 'Basculer le thème clair/sombre',
    'footer.tagline':
      "Formateur & consultant technique senior. J'aide les équipes et développeurs à livrer du logiciel fiable, depuis 2013.",
    'footer.pages': 'pages',
    'footer.resources': 'ressources',
    'footer.connect': 'contact',
    'footer.rss': 'Flux RSS',
    'footer.rights': 'Tous droits réservés.',
    'footer.builtWith': 'Built with',
    'footer.backToTop': 'Haut de page',
    'status.available': 'Disponible pour missions',
    'contact.write': 'Me contacter',
    'contact.copy': "Copier l'adresse",
    'contact.copied': 'Adresse copiée',
    'blog.readingTime': 'min de lecture',
    'blog.publishedOn': 'Publié le',
    'blog.updatedOn': 'Mis à jour le',
    'blog.readPost': "Lire l'article",
    'blog.allPosts': 'Tous les articles',
    'blog.latest': 'Derniers articles',
    'blog.draft': 'brouillon',
  },
  en: {
    'nav.home': 'Home',
    'nav.training': 'Training',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.primary': 'Main navigation',
    'nav.brandHome': 'Back to home',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.skip': 'Skip to content',
    'lang.switch': 'Switch language',
    'theme.toggle': 'Toggle light/dark theme',
    'footer.tagline':
      'Senior technical trainer & consultant. I help teams and developers ship reliable software, since 2013.',
    'footer.pages': 'pages',
    'footer.resources': 'resources',
    'footer.connect': 'contact',
    'footer.rss': 'RSS feed',
    'footer.rights': 'All rights reserved.',
    'footer.builtWith': 'Built with',
    'footer.backToTop': 'Back to top',
    'status.available': 'Available for work',
    'contact.write': 'Get in touch',
    'contact.copy': 'Copy address',
    'contact.copied': 'Address copied',
    'blog.readingTime': 'min read',
    'blog.publishedOn': 'Published on',
    'blog.updatedOn': 'Updated on',
    'blog.readPost': 'Read the post',
    'blog.allPosts': 'All posts',
    'blog.latest': 'Latest posts',
    'blog.draft': 'draft',
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
