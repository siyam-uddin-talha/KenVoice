import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { LANDING_PAGES } from '@/lib/landing-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: absoluteUrl('/invoices'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/invoices/new'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/clients'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/items'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/settings'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const landingRoutes: MetadataRoute.Sitemap = Object.keys(LANDING_PAGES).map((slug) => ({
    url: absoluteUrl(`/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...landingRoutes];
}
