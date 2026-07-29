import type { Metadata } from 'next';
import { SITE, absoluteUrl, ogImageUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Invoice Detail',
  description: 'View your invoice details, download or print as PDF, add your signature, and send directly to your client by email.',
  keywords: ['invoice detail', 'view invoice', 'download invoice pdf', 'send invoice', 'invoice signature', ...SITE.keywords],
  alternates: { canonical: '/invoices' },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/invoices'),
    title: `Invoice Detail | ${SITE.name}`,
    description: 'View, download, print, and send your invoice as a professional PDF.',
    siteName: `${SITE.name} · ${SITE.host}`,
    images: [{ url: SITE.ogImage.path, secureUrl: ogImageUrl(), width: SITE.ogImage.width, height: SITE.ogImage.height, alt: SITE.ogImage.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Invoice Detail | ${SITE.name}`,
    description: 'View, download, print, and send your invoice as a professional PDF.',
    images: [SITE.ogImage.path],
  },
};

export default function InvoiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
