import { getCollection, type CollectionEntry } from 'astro:content'
import { getSortedFilteredPosts } from './draft'
import { extractWikilinkTargets, gardenHref, isPublishedNote, noteCategory } from './garden-links'

export type NoteEntry = CollectionEntry<'notes'>
export { extractWikilinkTargets, gardenHref, isPublishedNote, noteCategory }

export function noteDate(note: NoteEntry): Date {
  return note.data.updated ?? note.data.created ?? new Date(0)
}

export async function getPublishedNotes(): Promise<NoteEntry[]> {
  const notes = await getCollection('notes')
  return notes
    .filter(
      (n) => !n.data.draft && !n.id.startsWith('_') && isPublishedNote(n.data)
    )
    .sort(
      (a, b) =>
        noteDate(b).valueOf() - noteDate(a).valueOf() || a.data.title.localeCompare(b.data.title)
    )
}

function noteAliases(note: NoteEntry): string[] {
  const file = note.id.split('/').pop() ?? note.id
  return [note.data.title.toLowerCase(), file]
}

/** Notes whose bodies contain a [[wikilink]] pointing at this note. */
export async function getBacklinks(note: NoteEntry): Promise<NoteEntry[]> {
  const aliases = noteAliases(note)
  const all = await getPublishedNotes()
  return all.filter((n) => {
    if (n.id === note.id || !n.body) return false
    const targets = extractWikilinkTargets(n.body)
    return aliases.some((a) => targets.includes(a))
  })
}

/** Blog posts sharing ≥1 tag with a garden note. */
export async function getRelatedPostsForNote(note: NoteEntry): Promise<CollectionEntry<'posts'>[]> {
  const noteTags = (note.data.tags ?? []).map((t) => t.toLowerCase())
  if (!noteTags.length) return []
  const posts = await getSortedFilteredPosts()
  return posts
    .map((p) => ({
      p,
      score: (p.data.tags ?? []).filter((t) => noteTags.includes(t.toLowerCase())).length
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.pubDate.valueOf() - a.p.data.pubDate.valueOf())
    .slice(0, 2)
    .map((x) => x.p)
}

/** Garden notes sharing ≥1 tag with a blog post. */
export async function getRelatedNotesForPost(post: CollectionEntry<'posts'>): Promise<NoteEntry[]> {
  const postTags = (post.data.tags ?? []).map((t) => t.toLowerCase())
  if (!postTags.length) return []
  const notes = await getPublishedNotes()
  return notes
    .map((n) => ({
      n,
      score: (n.data.tags ?? []).filter((t) => postTags.includes(t.toLowerCase())).length
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || noteDate(b.n).valueOf() - noteDate(a.n).valueOf())
    .slice(0, 2)
    .map((x) => x.n)
}
