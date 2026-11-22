/** Pure helpers for garden routing + wikilink analysis (no astro:content imports — unit-testable). */

export function gardenHref(id: string): string {
  return `/garden/${id}/`
}

/** Top-level folder of a note id; root-level notes bucket into "General". */
export function noteCategory(id: string): string {
  const i = id.indexOf('/')
  return i === -1 ? 'General' : id.slice(0, i)
}

/** Lowercased wikilink targets found in a note body. */
export function extractWikilinkTargets(body: string): string[] {
  const targets: string[] = []
  const re = /\[\[([^\]|#]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(body))) targets.push(m[1].trim().toLowerCase())
  return targets
}

// Quality gate: only mature/evergreen content goes public; garden plumbing
// (meta indexes, overview, hot/log pages) never does.
const PUBLISHED_STATUSES = new Set(['evergreen', 'mature'])
const HIDDEN_TYPES = new Set(['meta', 'overview'])

export function isPublishedNote(data: { status?: string; type?: string }): boolean {
  return (
    !!data.status && PUBLISHED_STATUSES.has(data.status) && !HIDDEN_TYPES.has(data.type ?? '')
  )
}
