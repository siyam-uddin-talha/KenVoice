import type { Metadata } from 'next';
import { SITE, absoluteUrl, ogImageUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Invoices',
  description: 'View, manage, and track all your invoices in one place. Filter by status, search clients, and send invoices directly from your invoice list.',
  keywords: ['invoices list', 'manage invoices', 'track invoices', 'invoice status', ...SITE.keywords],
  alternates: { canonical: '/invoices' },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/invoices'),
    title: `Invoices | ${SITE.name}`,
    description: 'View, manage, and track all your invoices in one place.',
    siteName: `${SITE.name} · ${SITE.host}`,
    images: [{ url: SITE.ogImage.path, secureUrl: ogImageUrl(), width: SITE.ogImage.width, height: SITE.ogImage.height, alt: SITE.ogImage.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Invoices | ${SITE.name}`,
    description: 'View, manage, and track all your invoices in one place.',
    images: [SITE.ogImage.path],
  },
};

export default function InvoicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
