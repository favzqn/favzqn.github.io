import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { slugifyPath } from './utils/slugify'

const posts = defineCollection({
  // Load Markdown and MDX files in the `src/content/posts/` directory.
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
      category: z.enum(['engineering', 'building', 'learning', 'personal']).optional(),
      lang: z.string().optional()
    })
})

const about = defineCollection({
  // Load Markdown files in the `src/content/about/` directory.
  loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
  schema: z.object({})
})

const experience = defineCollection({
  // Load Markdown files in the `src/content/experience/` directory.
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  schema: z.object({})
})

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tech: z.array(z.string()).optional(),
    live: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().optional(),
    priority: z.number().optional(),
    year: z.string().optional(),
    role: z.string().optional(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).optional()
  })
})

const recommendations = defineCollection({
  loader: glob({ base: './src/content/recommendations', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      quote: z.string(),
      name: z.string(),
      role: z.string().optional(),
      company: z.string().optional(),
      avatar: image().optional(),
      url: z.string().optional(),
      priority: z.number().optional()
    })
})

const notes = defineCollection({
  // Digital-garden notes migrated from the Obsidian vault (formerly favzqn/garden).
  loader: glob({
    base: './src/content/notes',
    pattern: '**/*.md',
    generateId: ({ entry }) => slugifyPath(entry.replace(/\.[^/.]+$/, ''))
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      draft: z.boolean().optional(),
      type: z.string().optional(),
      status: z.string().optional(),
      tags: z.array(z.string()).optional(),
      related: z.array(z.string()).optional(),
      created: z.coerce.date().optional(),
      updated: z.coerce.date().optional()
    })
})

export const collections = { posts, about, experience, projects, recommendations, notes }