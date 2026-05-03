import { allPosts } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://meublog.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: `${BASE_URL}${post.url}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const staticPages = [
    { url: `${BASE_URL}/sobre`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${BASE_URL}/contato`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${BASE_URL}/privacidade`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  return [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    ...staticPages,
    ...posts,
  ]
}
