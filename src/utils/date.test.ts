import { describe, it, expect, vi, beforeEach } from 'vitest'
import { formatDate, SUPPORTED_DATE_FORMATS } from './date'

vi.mock('@/config', () => ({
  themeConfig: {
    date: {
      dateFormat: 'YYYY-MM-DD',
      dateSeparator: '.'
    }
  }
}))

const date = new Date(2024, 2, 5) // March 5, 2024

describe('formatDate', () => {
  it('YYYY-MM-DD with dot separator', () => {
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024.03.05')
  })

  it('MM-DD-YYYY with dot separator', () => {
    expect(formatDate(date, 'MM-DD-YYYY')).toBe('03.05.2024')
  })

  it('DD-MM-YYYY with dot separator', () => {
    expect(formatDate(date, 'DD-MM-YYYY')).toBe('05.03.2024')
  })

  it('MONTH DAY YYYY returns span for month', () => {
    const result = formatDate(date, 'MONTH DAY YYYY')
    expect(result).toContain('<span class="month">Mar</span>')
    expect(result).toContain('5 2024')
  })

  it('DAY MONTH YYYY returns span for month', () => {
    const result = formatDate(date, 'DAY MONTH YYYY')
    expect(result).toContain('<span class="month">Mar</span>')
    expect(result).toContain('5 ')
  })

  it('falls back to config format when no format arg', () => {
    expect(formatDate(date)).toBe('2024.03.05')
  })

  it('falls back to YYYY-MM-DD for unknown format', () => {
    expect(formatDate(date, 'INVALID')).toBe('2024.03.05')
  })

  it('pads single-digit month and day', () => {
    const d = new Date(2024, 0, 7) // Jan 7
    expect(formatDate(d, 'YYYY-MM-DD')).toBe('2024.01.07')
  })
})

describe('SUPPORTED_DATE_FORMATS', () => {
  it('contains all 5 formats', () => {
    expect(SUPPORTED_DATE_FORMATS).toHaveLength(5)
  })

  it('contains expected formats', () => {
    expect(SUPPORTED_DATE_FORMATS).toContain('YYYY-MM-DD')
    expect(SUPPORTED_DATE_FORMATS).toContain('MM-DD-YYYY')
    expect(SUPPORTED_DATE_FORMATS).toContain('DD-MM-YYYY')
    expect(SUPPORTED_DATE_FORMATS).toContain('MONTH DAY YYYY')
    expect(SUPPORTED_DATE_FORMATS).toContain('DAY MONTH YYYY')
  })
})
