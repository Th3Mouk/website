// Blog helpers: locale/slug resolution, URLs, sorting, reading time.
// Posts are stored as `src/content/blog/<lang>/<slug>.mdx`, so an entry id
// looks like `fr/vues-materialisees-postgresql`.
import { getCollection, type CollectionEntry } from 'astro:content';
import { ROUTES, languages, type Lang } from '../i18n/ui';

export type Post = CollectionEntry<'blog'>;

export function postLang(post: Post): Lang {
  const [segment] = post.id.split('/');
  return segment in languages ? (segment as Lang) : 'fr';
}

export function postSlug(post: Post): string {
  return post.id.split('/').slice(1).join('/');
}

export function postUrl(post: Post): string {
  return `${ROUTES.blog[postLang(post)]}${postSlug(post)}/`;
}

/**
 * Published posts, newest first. Drafts are included in `astro dev` so they
 * can be previewed, and never in a production build.
 */
export async function getPosts(lang?: Lang): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    (post) =>
      (import.meta.env.DEV || !post.data.draft) && (lang === undefined || postLang(post) === lang)
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** The same post in the other locales, via a shared `translationKey`. */
export async function getTranslations(post: Post): Promise<Partial<Record<Lang, string>>> {
  const key = post.data.translationKey;
  if (!key) return {};
  const all = await getPosts();
  const map: Partial<Record<Lang, string>> = {};
  for (const p of all) {
    if (p.data.translationKey === key) map[postLang(p)] = postUrl(p);
  }
  return Object.keys(map).length > 1 ? map : {};
}

/** Minutes to read, at ~220 words per minute (code blocks count too). */
export function readingTime(body = ''): number {
  const words = body
    .replace(/^import .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(date: Date, lang: Lang, style: 'long' | 'short' = 'long'): string {
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  });
}

/** All tags used across posts, most frequent first. */
export function collectTags(posts: Post[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * French typography for titles and summaries: no-break space before `:`,
 * narrow no-break space before `; ! ?` and inside « », so punctuation never
 * starts a line. Other locales are returned unchanged.
 */
export function typeset(text: string, lang: Lang): string {
  if (lang !== 'fr') return text;
  return text
    .replace(/ :/g, ' :')
    .replace(/ ([;!?»])/g, ' $1')
    .replace(/« /g, '« ');
}
