import type { Metadata } from 'next';
import { SITE, absoluteUrl, ogImageUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Catalog Items',
  description: 'Build your product and service catalog. Save reusable line items with prices and descriptions to speed up invoice creation.',
  keywords: ['catalog items', 'invoice items', 'product catalog', 'service catalog', 'reusable line items', ...SITE.keywords],
  alternates: { canonical: '/items' },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/items'),
    title: `Catalog Items | ${SITE.name}`,
    description: 'Save reusable products and services to speed up invoice creation.',
    siteName: `${SITE.name} · ${SITE.host}`,
    images: [{ url: SITE.ogImage.path, secureUrl: ogImageUrl(), width: SITE.ogImage.width, height: SITE.ogImage.height, alt: SITE.ogImage.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Catalog Items | ${SITE.name}`,
    description: 'Save reusable products and services to speed up invoice creation.',
    images: [SITE.ogImage.path],
  },
};

export default function ItemsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
