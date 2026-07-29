import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { LANDING_PAGES, getLandingPageConfig } from '@/lib/landing-pages';
import { SITE, absoluteUrl, ogImageUrl } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(LANDING_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getLandingPageConfig(slug);

  if (!config) return {};

  const pageUrl = absoluteUrl(`/${slug}`);

  return {
    title: config.title,
    description: config.description,
    keywords: [...config.keywords, ...SITE.keywords],
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: config.title,
      description: config.description,
      siteName: `${SITE.name} · ${SITE.host}`,
      images: [
        {
          url: SITE.ogImage.path,
          secureUrl: ogImageUrl(),
          width: SITE.ogImage.width,
          height: SITE.ogImage.height,
          alt: config.h1Title,
          type: SITE.ogImage.type,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [SITE.ogImage.path],
    },
  };
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const config = getLandingPageConfig(slug);

  if (!config) {
    notFound();
  }

  // Redirect to the main app — the slug page purely serves as an SEO entry point
  redirect('/');
}
