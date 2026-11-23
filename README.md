# Fauzan Fathurrahman's Personal Site

**Live Site**: [https://fau.ai.id/](https://fau.ai.id/)
**Deploy status**: [app.netlify.com/sites/feyzan](https://app.netlify.com/sites/feyzan/deploys)

Personal website and blog of Fauzan Fathurrahman — full-stack engineer & SDET building scalable products, chatbots, and test automation systems.

## About

This site showcases my work in software engineering, test automation, and technical leadership. It includes:

- **Blog**: Notes on software engineering, building things, technology, books, and the occasional rabbit hole
- **Garden**: Public digital garden at `/garden` — book notes, synthesis, and working knowledge imported from the private `digital-garden` Jekyll repo. Only `mature`/`evergreen` notes publish; `developing` stays hidden until promoted.
- **Experience**: Professional journey across startups and scale-ups
- **Projects**: Open-source contributions and side projects

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

# Create a garden note (e.g. "Books/Atomic Habits")
pnpm new-note "Folder/Title"

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
│   ├── plugins/        # Remark/rehype plugins
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── public/             # Static assets
└── scripts/            # Build scripts
```

## License

MIT