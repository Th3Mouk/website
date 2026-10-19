// Shared RSS feed builder for /blog/rss.xml and /en/blog/rss.xml.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from './blog';
import { SITE_TITLE } from '../consts';
import type { Lang } from '../i18n/ui';

const descriptions: Record<Lang, string> = {
  fr: "Notes de terrain sur PHP, Symfony, PostgreSQL, le cloud, le DevOps et l'IA.",
  en: 'Field notes on PHP, Symfony, PostgreSQL, cloud, DevOps and AI.',
};

export async function blogFeed(context: APIContext, lang: Lang) {
  const posts = await getPosts(lang);
  return rss({
    title: `${SITE_TITLE} — Blog`,
    description: descriptions[lang],
    site: context.site ?? 'https://marodon.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: `<language>${lang === 'fr' ? 'fr-fr' : 'en-us'}</language>`,
  });
}
