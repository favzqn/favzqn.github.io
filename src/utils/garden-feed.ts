import type { APIContext } from 'astro'
import { Feed } from 'feed'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
import { themeConfig } from '@/config'
import { gardenHref, getPublishedNotes, noteDate } from './garden'

const markdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'div', 'span']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['class', 'id'],
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height']
  }
}

/** RSS 2.0 feed for the digital garden (separate from the blog feed). */
export async function generateGardenRSS(context: APIContext) {
  const siteUrl = (context.site?.toString() || themeConfig.site.website).replace(/\/$/, '')
  const notes = await getPublishedNotes()

  const feed = new Feed({
    title: `Garden · ${themeConfig.site.title}`,
    description: 'Notes, book summaries, and working knowledge from the digital garden.',
    id: `${siteUrl}/garden/`,
    link: `${siteUrl}/garden/`,
    language: 'en-US',
    copyright: `Copyright © ${new Date().getFullYear()} ${themeConfig.site.author}`,
    updated: notes.length ? noteDate(notes[0]) : new Date(),
    generator: 'Astro Chiri Feed Generator',
    feedLinks: { rss: `${siteUrl}/garden.xml` },
    author: {
      name: themeConfig.site.author,
      link: siteUrl
    }
  })

  for (const note of notes) {
    const url = new URL(gardenHref(note.id), siteUrl).toString()
    const rawHtml = markdownParser.render(note.body || '')
    const cleanHtml = sanitizeHtml(rawHtml, sanitizeOptions)
    feed.addItem({
      title: note.data.title,
      id: url,
      link: url,
      content: cleanHtml,
      date: noteDate(note),
      updated: noteDate(note)
    })
  }

  const rssXml = feed
    .rss2()
    .replace(
      '<?xml version="1.0" encoding="utf-8"?>',
      '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet type="text/xsl" href="/feeds/rss-style.xsl"?>'
    )
  return new Response(rssXml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  })
}
