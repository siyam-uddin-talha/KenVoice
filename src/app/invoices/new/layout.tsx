import type { Metadata } from 'next';
import { SITE, absoluteUrl, ogImageUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Create New Invoice',
  description: 'Create a professional invoice in seconds. Add line items, set tax rates, apply discounts, attach your signature, and send or download as PDF.',
  keywords: ['create invoice', 'new invoice', 'invoice maker', 'generate invoice', 'pdf invoice creator', ...SITE.keywords],
  alternates: { canonical: '/invoices/new' },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/invoices/new'),
    title: `Create New Invoice | ${SITE.name}`,
    description: 'Create a professional invoice in seconds. Add line items, tax, discounts, and send as PDF.',
    siteName: `${SITE.name} · ${SITE.host}`,
    images: [{ url: SITE.ogImage.path, secureUrl: ogImageUrl(), width: SITE.ogImage.width, height: SITE.ogImage.height, alt: SITE.ogImage.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Create New Invoice | ${SITE.name}`,
    description: 'Create a professional invoice in seconds. Add line items, tax, discounts, and send as PDF.',
    images: [SITE.ogImage.path],
  },
};

export default function NewInvoiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
