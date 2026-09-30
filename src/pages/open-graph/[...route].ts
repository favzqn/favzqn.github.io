---
import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
import { themeConfig } from '../../config'

const posts = await getCollection('posts')
const projects = await getCollection('projects')

// Map posts
const postPages = Object.fromEntries(
  posts.map(({ id, data }) => [id.replace(/\.(md|mdx)$/, ''), data])
)

// Map projects
const projectPages = Object.fromEntries(
  projects.map(({ id, data }) => [`projects/${id}`, data])
)

// Combine
const pages = { ...postPages, ...projectPages }

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description || themeConfig.site.title,
    logo: {
      path: 'public/og/og-logo.png',
      size: [80, 80]
    },
    bgGradient: [[255, 255, 255]],
    bgImage: {
      path: 'public/og/og-bg.png',
      fit: 'fill'
    },
    padding: 64,
    font: {
      title: {
        color: [28, 28, 28],
        size: 68,
        weight: 'SemiBold',
        families: ['Inter']
      },
      description: {
        color: [180, 180, 180],
        size: 40,
        weight: 'Medium',
        families: ['Inter']
      }
    },
    fonts: [
      'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-600-normal.woff2',
      'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-400-normal.woff2',
    ]
  })
})