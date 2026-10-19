import { ui, defaultLang, languages, type Lang, type UiKey } from './ui';

/**
 * Detect the locale from a URL. English pages live under `/en/`; everything
 * else is the default locale. Used as a fallback when a page does not pass
 * `lang` explicitly.
 */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment in languages) return segment as Lang;
  return defaultLang;
}

/**
 * Returns a `t(key)` translator bound to `lang`, falling back to the default
 * locale for any key missing in the requested locale.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Map a locale code to its Open Graph `og:locale` value. */
export const ogLocale: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_US',
};

/** Map a locale code to its BCP-47 / HTML `lang` attribute value. */
export const htmlLang: Record<Lang, string> = {
  fr: 'fr',
  en: 'en',
};
