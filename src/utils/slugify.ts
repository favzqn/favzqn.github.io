/** Slugify a single path segment (lowercase, alphanumeric, dash-separated). */
export function slugifySegment(input: string): string {
  return input
    .toLowerCase()
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Slugify a slash-separated relative path (keeps folder structure). */
export function slugifyPath(relPath: string): string {
  return relPath
    .split('/')
    .map(slugifySegment)
    .filter(Boolean)
    .join('/')
}
