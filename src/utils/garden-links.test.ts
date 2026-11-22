import { describe, it, expect } from 'vitest'
import { slugifyPath, slugifySegment } from './slugify'
import {
  extractWikilinkTargets,
  gardenHref,
  isPublishedNote,
  noteCategory
} from './garden-links'

describe('slugify', () => {
  it('slugifies segments like Obsidian vault filenames', () => {
    expect(slugifySegment('The Richest Man in Babylon')).toBe('the-richest-man-in-babylon')
    expect(slugifySegment('Who Moved My Cheese?')).toBe('who-moved-my-cheese')
    expect(slugifySegment('Surah Al-Baqarah 2:208')).toBe('surah-al-baqarah-2-208')
    expect(slugifySegment('push notifications')).toBe('push-notifications')
  })

  it('keeps folder structure when slugging paths', () => {
    expect(slugifyPath('Software Quality Engineering/stlc')).toBe('software-quality-engineering/stlc')
    expect(slugifyPath('dad-jokes')).toBe('dad-jokes')
  })
})

describe('garden-links', () => {
  it('builds garden hrefs', () => {
    expect(gardenHref('books/stlc')).toBe('/garden/books/stlc/')
  })

  it('derives category from first path segment', () => {
    expect(noteCategory('books/who-moved-my-cheese')).toBe('books')
    expect(noteCategory('dad-jokes')).toBe('General')
  })

  it('extracts wikilink targets case-insensitively', () => {
    const body = 'See [[The Psychology of Money]] and [[agile|my take]], plus [[stlc#intro]].'
    expect(extractWikilinkTargets(body)).toEqual([
      'the psychology of money',
      'agile',
      'stlc'
    ])
  })

  it('ignores non-wikilink text', () => {
    expect(extractWikilinkTargets('plain [link](https://x.com) text')).toEqual([])
  })
})

describe('isPublishedNote quality gate', () => {
  it('publishes mature and evergreen content', () => {
    expect(isPublishedNote({ status: 'mature', type: 'concept' })).toBe(true)
    expect(isPublishedNote({ status: 'evergreen', type: 'source' })).toBe(true)
  })

  it('hides developing, minor, stub, and missing status', () => {
    expect(isPublishedNote({ status: 'developing', type: 'concept' })).toBe(false)
    expect(isPublishedNote({ status: 'minor', type: 'concept' })).toBe(false)
    expect(isPublishedNote({ status: 'stub', type: 'entity' })).toBe(false)
    expect(isPublishedNote({ type: 'concept' })).toBe(false)
  })

  it('always hides garden plumbing (meta/overview)', () => {
    expect(isPublishedNote({ status: 'evergreen', type: 'meta' })).toBe(false)
    expect(isPublishedNote({ status: 'evergreen', type: 'overview' })).toBe(false)
  })
})
