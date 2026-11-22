/**
 * Create a new digital-garden note.
 * Usage: pnpm new-note "Folder/Title"   e.g. pnpm new-note "Books/Atomic Habits"
 * Draft: prefix with underscore         e.g. pnpm new-note "_Ideas/Half thought"
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'

const titleArgs: string[] = process.argv.slice(2)
if (titleArgs.length === 0) {
  console.error('Usage: pnpm new-note "Folder/Title"')
  process.exit(1)
}
const raw: string = titleArgs.join(' ')

const isDraft: boolean = raw.startsWith('_')
const display: string = isDraft ? raw.slice(1) : raw

const slashIdx: number = display.lastIndexOf('/')
const folder: string = slashIdx >= 0 ? display.slice(0, slashIdx).trim() : ''
const title: string = slashIdx >= 0 ? display.slice(slashIdx + 1).trim() : display

if (!title) {
  console.error('⚠️ Note title is empty')
  process.exit(1)
}

// Keep filenames human-readable — wikilinks resolve via frontmatter title anyway.
// Strip only characters that are illegal on common filesystems.
const fileName: string = title.replace(/[/:*?"<>|\\]/g, '').trim()
const targetFile: string = `${isDraft ? '_' : ''}${fileName}.md`
const fullPath: string = join('src/content/notes', folder, targetFile)

if (existsSync(fullPath)) {
  console.error(`😇 File already exists: ${fullPath}`)
  process.exit(1)
}

mkdirSync(dirname(fullPath), { recursive: true })

const today: string = new Date().toISOString().split('T')[0]
const content: string = `---
title: ${JSON.stringify(title)}
draft: ${isDraft}
tags: []
created: '${today}'
updated: '${today}'
---

`

try {
  writeFileSync(fullPath, content)
  console.log(`${isDraft ? '📝 Draft' : '🌿 Note'} created: ${fullPath}`)
} catch (error) {
  console.error('⚠️ Failed to create note:', error)
  process.exit(1)
}
