import type { Metadata } from 'next';
import { SITE, absoluteUrl, ogImageUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Clients',
  description: 'Manage your client database. Add client details, addresses, tax IDs, and contact information to auto-fill invoices quickly.',
  keywords: ['client management', 'manage clients', 'client list', 'invoice clients', 'client address book', ...SITE.keywords],
  alternates: { canonical: '/clients' },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/clients'),
    title: `Clients | ${SITE.name}`,
    description: 'Manage your client database. Add client details to auto-fill invoices quickly.',
    siteName: `${SITE.name} · ${SITE.host}`,
    images: [{ url: SITE.ogImage.path, secureUrl: ogImageUrl(), width: SITE.ogImage.width, height: SITE.ogImage.height, alt: SITE.ogImage.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Clients | ${SITE.name}`,
    description: 'Manage your client database. Add client details to auto-fill invoices quickly.',
    images: [SITE.ogImage.path],
  },
};

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
