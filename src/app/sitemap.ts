import type { MetadataRoute } from 'next'
import { caseStudies } from '@content/work'
import { site } from '@/lib/site'

// Generated to /out/sitemap.xml at export time.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/colophon/`, changeFrequency: 'yearly', priority: 0.4 },
  ]
  for (const study of caseStudies) {
    routes.push({
      url: `${site.url}/work/${study.slug}/`,
      changeFrequency: 'yearly',
      priority: 0.7,
    })
  }
  return routes
}
