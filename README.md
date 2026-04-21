# Fauzan Fathurrahman's Personal Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://app.netlify.com/sites/feyzan/deploys)

Personal website and blog of Fauzan Fathurrahman - Full-stack engineer, technical leader, and builder of scalable products.

🌐 **Live Site**: [https://feyzan.netlify.app/](https://feyzan.netlify.app/)

## About

This site showcases my work in software engineering, test automation, and technical leadership. It includes:

- **Blog**: Technical articles on AWS, automation, AI, and engineering practices
- **Experience**: Professional journey and impact metrics
- **Projects**: Open-source contributions and side projects
- **Playground**: Interactive developer tools (JSON formatter, regex tester, etc.)
- **Resources**: Curated lists of books, podcasts, and learning materials

## Tech Stack

- **Framework**: [Astro 5](https://astro.build) with TypeScript
- **Styling**: Custom CSS with CSS variables for theming
- **Content**: MDX with KaTeX for math, custom remark/rehype plugins
- **Deployment**: Netlify with optimized caching and compression
- **CI/CD**: GitHub Actions with automated testing and Dependabot

## Features

- ⚡ Optimized for performance (FCP < 1s on mobile)
- 🌓 Light/Dark mode with no flash
- 📱 Fully responsive design
- 🔍 SEO optimized with sitemap, RSS/Atom feeds, OpenGraph
- 🎨 Syntax highlighting with copy-to-clipboard
- 📊 Reading time estimates and table of contents
- 🖼️ Automatic image optimization (WebP, quality 80)
- 🔗 Link cards with metadata fetching
- 🧮 KaTeX for mathematical expressions

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Create new blog post
pnpm new "Post Title"

# Create draft (prefix with underscore)
pnpm new "_Draft Title"

# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Blog posts, projects, experience
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── plugins/        # Custom remark/rehype plugins
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── public/             # Static assets
└── scripts/            # Build and utility scripts
```

## Content Management

- Blog posts: `src/content/posts/`
- Drafts: Prefix filename with `_` (e.g., `_draft-post.md`)
- Images: Store in `src/content/posts/_assets/`
- Configuration: `src/config.ts`

## Performance Optimizations

- CSS inlining disabled for faster mobile load
- Fade animations disabled for instant navigation
- Image quality optimized (80 vs 85)
- HTTP/2 font preloading
- Aggressive caching headers
- Brotli compression enabled

## License

MIT
