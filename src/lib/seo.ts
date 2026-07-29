/** Shared site SEO + ownership constants for KenVoice Invoice Generator */

export const OWNER = {
  name: 'Sutio',
  legalName: 'Sutio',
  url: 'https://www.sutio.co/',
  email: 'siyam.uddin.talha@gmail.com',
  description:
    'Sutio builds web apps, mobile and desktop software, LLM products, and bespoke systems for startups and enterprises.',
} as const;

/** Canonical product domain. Override with NEXT_PUBLIC_SITE_URL env var. */
export const DEFAULT_SITE_URL = 'https://kenvoice.sutio.co';

export const SITE = {
  name: 'KenVoice',
  host: 'kenvoice.sutio.co',
  tagline: 'Simple. Beautiful. Invoicing.',
  description:
    'KenVoice is a free, privacy-first invoice generator. Create, send, and manage professional invoices entirely in your browser — no sign-up, no cloud, your data stays on your device.',
  keywords: [
    'invoice generator',
    'free invoice maker',
    'invoice creator',
    'professional invoice',
    'pdf invoice',
    'send invoice email',
    'invoice template',
    'small business invoicing',
    'freelance invoice',
    'client management',
    'KenVoice',
    'Sutio',
    'kenvoice.sutio.co',
  ],
  get url() {
    return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
  },
  ogImage: {
    path: '/og.png',
    width: 1200,
    height: 630,
    alt: 'KenVoice — Simple. Beautiful. Invoicing.',
    type: 'image/png',
  },
} as const;

export function absoluteUrl(path = '/') {
  const base = SITE.url;
  if (!path || path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function ogImageUrl() {
  return absoluteUrl(SITE.ogImage.path);
}
