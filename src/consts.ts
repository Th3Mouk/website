// Global site data. Import from anywhere with `import { … } from '../consts'`.

export const SITE_TITLE = 'Jérémy Marodon';
export const SITE_DESCRIPTION =
  'Formateur, consultant et développeur. Web, cloud AWS, DevOps. 13 ans à coder, à transmettre et à porter la prod.';

/** Author identity, reused by the blog (bylines, JSON-LD, RSS). */
export const AUTHOR = {
  name: 'Jérémy Marodon',
  photo: '/profil2-blue.jpg',
  photoWebp: '/profil2-blue.webp',
};

/** Contact points. Single source of truth — never hardcode these in pages. */
export const CONTACT = {
  linkedin: 'https://www.linkedin.com/in/jeremymarodon/',
  github: 'https://github.com/Th3Mouk',
};

/**
 * The email address never appears in clear in the built HTML or JSON-LD,
 * where address harvesters look. Links carry it base64-encoded in
 * `data-mailto`; src/scripts/contact.ts builds the mailto: on click and
 * powers the "copy address" buttons. Without JS a mail link falls back to
 * LinkedIn. Use the `mail` prop of Button / IconButton, or spread
 * `mailLink()` on a plain <a>.
 */
export const EMAIL_ENCODED = btoa('marodon.jeremy@gmail.com');

export function mailLink(subject?: string) {
  return {
    href: CONTACT.linkedin,
    'data-mailto': EMAIL_ENCODED,
    ...(subject ? { 'data-mail-subject': subject } : {}),
  };
}
