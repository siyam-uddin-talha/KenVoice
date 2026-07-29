import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/hooks/useToast';
import { AppLayout } from '@/components/layout/AppLayout';
import { SITE, OWNER, absoluteUrl, ogImageUrl } from '@/lib/seo';

const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const viewport: Viewport = {
  themeColor: '#2b4c33',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: OWNER.name, url: OWNER.url }],
  creator: OWNER.name,
  publisher: OWNER.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: absoluteUrl('/'),
    siteName: `${SITE.name} · ${SITE.host}`,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage.path,
        secureUrl: ogImageUrl(),
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: SITE.ogImage.alt,
        type: SITE.ogImage.type,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage.path],
    creator: '@sutio_co',
    site: '@sutio_co',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/logo.png', sizes: '512x512', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE.name,
  },
  category: 'business',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body
        className="bg-[#f5f4ef] text-[#161917] font-sans antialiased min-h-screen"
        suppressHydrationWarning
      >
        <ToastProvider>
          <AppLayout>{children}</AppLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
