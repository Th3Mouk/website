import type { Lang } from '../i18n/ui';

/** A string that exists in every supported locale. */
export type Localized = Record<Lang, string>;

export type ProjectStatus = 'active' | 'maintenance' | 'paused';

/** What a link points at — drives the button label + icon on the card. */
export type ProjectLinkKind = 'site' | 'github' | 'package';

export interface ProjectLink {
  url: string;
  kind: ProjectLinkKind;
  /**
   * Optional label override. When omitted, a localized default per `kind` is
   * used ("Visit the site" / "View on GitHub"). Provide one to disambiguate
   * several links of the same kind (e.g. a library vs. its bundle).
   */
  label?: Localized;
}

export interface Project {
  /** Stable, URL-safe id. Used as a key and for JSON-LD list positions. */
  slug: string;
  /** Product name. Not localized (brand names usually stay as-is). */
  name: string;
  /** Bare identifier shown as a mono chip, e.g. a domain or package name. */
  domain?: string;
  /** Drives the status dot colour + label. */
  status: ProjectStatus;
  /** Free-form period, e.g. `'2024 — présent'`. Optional. */
  since?: string;
  /** Tech chips. Leave empty to hide the row. */
  tech?: string[];
  /** One-line localized summary, shown under the title. */
  tagline: Localized;
  /** Short localized paragraph (1–2 sentences). */
  description: Localized;
  /**
   * Zero or more links. The FIRST is the primary action (main button, and the
   * JSON-LD `url`); the rest render as secondary buttons. A project with no
   * links renders no button — handy for an app with no public repo/download
   * yet; the card then deep-links to itself (`#slug`) for the JSON-LD.
   */
  links?: ProjectLink[];
}

/**
 * Projects currently maintained, newest/most-prominent first.
 *
 * To add a project: append an entry below with both `fr` and `en` copy.
 * Keep descriptions concrete and specific — they feed both the page and the
 * JSON-LD structured data Google reads. See AGENTS.md → "Add a project".
 */
export const projects: Project[] = [
  {
    slug: 'serato-cue',
    name: 'Serato Import',
    status: 'active',
    tech: ['Python', 'macOS', 'Serato DJ', 'Mixed In Key'],
    tagline: {
      fr: 'Vos dossiers de musique deviennent des crates Serato, automatiquement',
      en: 'Your music folders become Serato crates, automatically',
    },
    description: {
      fr: "Application macOS pour DJ : elle transforme chaque dossier de musique en crate Serato du même nom et les resynchronise sans doublon. Son pont Mixed In Key réinjecte les cue points, la tonalité et la grille dans Serato 4.0, là où l'export MIK natif ne s'affiche plus.",
      en: 'A macOS app for DJs: it turns each music folder into a Serato crate of the same name and re-syncs them without duplicates. Its Mixed In Key bridge re-injects cue points, key and beatgrid into Serato 4.0, where the native MIK export no longer shows up.',
    },
    // No public repo / download yet (unnotarized macOS app, distributed
    // privately). Add a `links: [...]` entry once it ships publicly.
  },
  {
    slug: 'materialized-view',
    name: 'Materialized View',
    domain: 'th3mouk/materialized-view',
    status: 'active',
    tech: ['PHP', 'PostgreSQL', 'Doctrine DBAL', 'Symfony'],
    tagline: {
      fr: 'Vues matérialisées PostgreSQL déclaratives sur Doctrine DBAL',
      en: 'Declarative PostgreSQL materialized views on Doctrine DBAL',
    },
    description: {
      fr: "Librairie PHP open source qui gère les vues matérialisées PostgreSQL de façon déclarative : définitions SQL versionnées, détection de drift, rebuild sûr et refresh CONCURRENTLY. Le cœur est agnostique du framework ; un bundle Symfony ajoute l'autoconfiguration, les commandes console et le déploiement multi-tenant.",
      en: 'An open-source PHP library that manages PostgreSQL materialized views declaratively: versioned SQL definitions, drift detection, safe rebuilds and CONCURRENTLY refresh. The core is framework-agnostic; a Symfony bundle adds autoconfiguration, console commands and a multi-tenant deploy lane.',
    },
    links: [
      {
        url: 'https://github.com/Th3Mouk/materialized-view',
        kind: 'github',
        label: { fr: 'Librairie', en: 'Library' },
      },
      {
        url: 'https://github.com/Th3Mouk/materialized-view-bundle',
        kind: 'github',
        label: { fr: 'Bundle Symfony', en: 'Symfony bundle' },
      },
    ],
  },
  {
    slug: 'maestro',
    name: 'Maestro',
    domain: '@th3mouk/maestro',
    status: 'active',
    tech: ['TypeScript', 'Node.js', 'CLI'],
    tagline: {
      fr: "Espaces de travail multi-dépôts pour les équipes d'ingénierie",
      en: 'Multi-repository workspaces for engineering teams',
    },
    description: {
      fr: "Outil en ligne de commande (TypeScript) qui prépare des espaces de travail multi-dépôts, partiels ou complets : il n'expose que le code nécessaire, réduit le contexte superflu pour les runtimes d'IA, partage des packs entre équipes et fait tourner le même workspace en local ou dans le cloud — sans imposer de monorepo. Bâti sur le sparse-checkout et les worktrees Git.",
      en: 'A TypeScript CLI that prepares partial or complete multi-repository workspaces: it exposes only the code you need, trims unnecessary context for AI runtimes, shares packs across teams, and runs the same workspace locally or in the cloud — without forcing a monorepo. Built on Git sparse-checkout and worktrees.',
    },
    links: [
      { url: 'https://github.com/Th3Mouk/Maestro', kind: 'github' },
      {
        url: 'https://www.npmjs.com/package/@th3mouk/maestro',
        kind: 'package',
        label: { fr: 'npm', en: 'npm' },
      },
    ],
  },
  {
    slug: 'golf',
    name: 'Golf',
    domain: 'golf.marodon.com',
    status: 'active',
    // TODO(content): enrich with the real launch year, the tech stack
    // (tech: ['…']) and a sharper description / screenshot when available.
    tech: [],
    tagline: {
      fr: 'Jeu de golf en ligne, jouable dans le navigateur',
      en: 'Online golf game, playable in the browser',
    },
    description: {
      fr: 'Un jeu de golf jouable directement depuis le navigateur, hébergé sur golf.marodon.com. Projet personnel que je maintiens et fais évoluer au fil du temps.',
      en: 'A golf game playable straight from the browser, hosted at golf.marodon.com. A personal project I keep maintained and improve over time.',
    },
    links: [{ url: 'https://golf.marodon.com/', kind: 'site' }],
  },
];
