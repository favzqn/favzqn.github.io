import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

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
      category: z.enum(['engineering', 'automation', 'ai', 'aws', 'leadership', 'personal', 'reviews']).optional(),
      lang: z.string().optional()
    })
})

const about = defineCollection({
  // Load Markdown files in the `src/content/about/` directory.
  loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

const experience = defineCollection({
  // Load Markdown files in the `src/content/experience/` directory.
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

const uses = defineCollection({
  loader: glob({ base: './src/content/uses', pattern: '**/*.md' }),
  schema: z.object({})
})

export const collections = { posts, about, experience }
