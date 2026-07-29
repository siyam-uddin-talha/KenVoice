import type { Metadata } from 'next';
import { SITE, absoluteUrl, ogImageUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Configure your business profile, company logo, address, email sender settings, and email API keys for sending invoices.',
  keywords: ['invoice settings', 'business profile', 'company logo', 'email settings', 'brevo api key', ...SITE.keywords],
  alternates: { canonical: '/settings' },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/settings'),
    title: `Settings | ${SITE.name}`,
    description: 'Configure your business profile and email sending settings.',
    siteName: `${SITE.name} · ${SITE.host}`,
    images: [{ url: SITE.ogImage.path, secureUrl: ogImageUrl(), width: SITE.ogImage.width, height: SITE.ogImage.height, alt: SITE.ogImage.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Settings | ${SITE.name}`,
    description: 'Configure your business profile and email sending settings.',
    images: [SITE.ogImage.path],
  },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
