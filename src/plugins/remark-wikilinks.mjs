import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { visit } from 'unist-util-visit'

// ponytail: keep in sync with src/utils/slugify.ts — this file loads in plain
// Node next to astro.config and imports TS siblings unreliably.
function segment(input) {
  return input
    .toLowerCase()
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const notesDir = fileURLToPath(new URL('../content/notes/', import.meta.url))

function buildMap() {
  const map = new Map()
  const walk = (dir, prefix) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name)
      if (statSync(full).isDirectory()) {
        walk(full, prefix + name + '/')
        continue
      }
      if (!name.endsWith('.md')) continue
      const body = readFileSync(full, 'utf8')
      const head = body.slice(0, 500)
      if (/^draft:\s*true/m.test(head)) continue
      // Keep in sync with isPublishedNote in src/utils/garden-links.ts —
      // links must only resolve to pages that actually get built.
      const status = head.match(/^status:\s*(\S+)/m)?.[1]
      const type = head.match(/^type:\s*(\S+)/m)?.[1]
      if (!status || !['evergreen', 'mature'].includes(status)) continue
      if (type === 'meta' || type === 'overview') continue
      const id = (prefix + name)
        .replace(/\.md$/, '')
        .split('/')
        .map(segment)
        .filter(Boolean)
        .join('/')
      const fileName = name.replace(/\.md$/, '').toLowerCase()
      map.set(fileName, id)
      const title = body.match(/^title:\s*(.+)$/m)
      if (title) {
        map.set(title[1].trim().replace(/^['"]|['"]$/g, '').toLowerCase(), id)
      }
    }
  }
  try {
    walk(notesDir, '')
  } catch {
    /* notes dir not created yet */
  }
  return map
}

const wikilinkMap = buildMap()

/** Rewrite Obsidian `[[wikilinks]]` to /garden/<slug>/ links; unresolved targets render as plain text. */
export default function remarkWikilinks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof node.value !== 'string' || !node.value.includes('[[')) return

      const parts = []
      let last = 0
      const re = /\[\[([^\]]+)\]\]/g
      let m
      while ((m = re.exec(node.value))) {
        if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) })
        const [targetRaw, aliasRaw] = m[1].split('|')
        const target = targetRaw.split('#')[0].trim()
        const display = aliasRaw ? aliasRaw.trim() : target
        const id = wikilinkMap.get(target.toLowerCase())
        if (id) {
          parts.push({
            type: 'link',
            url: `/garden/${id}/`,
            title: null,
            children: [{ type: 'text', value: display }]
          })
        } else {
          parts.push({ type: 'text', value: display })
        }
        last = m.index + m[0].length
      }
      if (!parts.length) return
      if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) })

      parent.children.splice(index, 1, ...parts)
      return index + parts.length
    })
  }
}
