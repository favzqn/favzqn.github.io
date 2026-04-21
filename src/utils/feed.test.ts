import { describe, it } from 'vitest'

// feed.ts uses astro:content and node fs — integration tested via build output.
// Unit-testable logic lives in date.ts (see date.test.ts).
describe('feed', () => {
  it.todo('RSS feed generates valid XML with all post fields')
  it.todo('Atom feed generates valid XML with all post fields')
  it.todo('image paths in feed resolve relative URLs to absolute')
  it.todo('sanitization strips disallowed HTML tags from feed content')
})
