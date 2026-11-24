import { test, expect } from '@playwright/test'

test.describe('site smoke', () => {
  test('homepage: hero, quick links, stats, 9 recommendations', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Fauzan')
    await expect(page.locator('.status-pill')).toBeVisible()
    await expect(page.locator('.home-stats .stat')).toHaveCount(5)
    await expect(page.locator('.chips a')).toHaveCount(5)
    await expect(page.locator('blockquote')).toHaveCount(9)
    await expect(page.locator('.rec-author a')).toHaveCount(9)
  })

  test('case study: meta, metrics, section nav, CTA', async ({ page }) => {
    await page.goto('/projects/ai-test-generator/')
    await expect(page.locator('.project-meta')).toContainText('2025')
    await expect(page.locator('.impact-value')).toHaveCount(3)
    await expect(page.locator('.section-nav a')).toHaveCount(4)
    await expect(page.locator('.project-cta')).toBeVisible()
  })

  test('blog: heading, search, related posts on a post', async ({ page }) => {
    await page.goto('/blog/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Blog')
    await expect(page.locator('#blog-search')).toBeAttached()

    await page.goto('/codeguru/')
    // First .related = "Keep reading" posts; later sections can be garden cross-links
    await expect(page.locator('.related').first().locator('.related-title')).toHaveCount(2)
    await expect(page.locator('.post-cta-link')).toBeVisible()
  })

  test('garden: index sections with counts, note page renders', async ({ page }) => {
    await page.goto('/garden/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Garden')
    await expect(page.locator('.garden-section h2, .garden-section-more h2')).not.toHaveCount(0)
    await expect(page.locator('.count').first()).toBeVisible()
    await expect(page.locator('li[data-category]')).not.toHaveCount(0)

    await page.goto('/garden/books/a-mind-for-numbers/a-mind-for-numbers/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('A Mind for Numbers')
    await expect(page.locator('.note-tags li')).not.toHaveCount(0)
    await expect(page.locator('[data-pagefind-body]')).toBeAttached()
  })

  test('hire page: recommendations block before CTA', async ({ page }) => {
    await page.goto('/hire/')
    await expect(page.locator('blockquote')).toHaveCount(2)
    await expect(page.getByRole('heading', { name: "Let's Talk" })).toBeVisible()
  })

  test('projects filter renders and all cards present', async ({ page }) => {
    await page.goto('/projects/')
    await expect(page.locator('.filter-chip')).not.toHaveCount(0)
    await expect(page.locator('.project-card')).toHaveCount(14)
  })

  test('internal links from homepage resolve', async ({ page, request }) => {
    await page.goto('/')
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))])
    for (const href of hrefs) {
      const res = await request.get(href)
      expect(res.status(), `${href} -> ${res.status()}`).toBeLessThan(400)
    }
  })

  test('command palette opens with shortcut and closes with Escape', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.cp-trigger')).toBeVisible()
    await page.keyboard.press('ControlOrMeta+k')
    await expect(page.locator('#cp-backdrop')).toBeVisible()
    await expect(page.locator('#cp-results li')).not.toHaveCount(0)
    await page.fill('#cp-input', 'NAS')
    await expect(page.locator('#cp-results a[href="/nas-stb/"]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('#cp-backdrop')).toBeHidden()
  })

  test('blog category filter narrows the list', async ({ page }) => {
    await page.goto('/blog/')
    const total = await page.locator('li[data-category]').count()
    await page.locator('button[data-category="engineering"]').click()
    const visible = await page.locator('li[data-category]:not([style*="display: none"])').count()
    expect(visible).toBeGreaterThan(0)
    expect(visible).toBeLessThan(total)
    await page.locator('button[data-category="all"]').click()
    await expect(page.locator('li[data-category]:not([style*="display: none"])')).toHaveCount(total)
  })

  test('experience page renders timeline entries and certification', async ({ page }) => {
    await page.goto('/experience/')
    expect(await page.locator('.experience h2').count()).toBeGreaterThanOrEqual(6)
    await expect(page.locator('.certifications h2')).toHaveText('Certifications')
    await expect(page.locator('.cert-card')).toBeVisible()
  })

  test('unknown URL returns 404 with navigation', async ({ page }) => {
    const res = await page.goto('/no-such-page')
    expect(res?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('404')
    await expect(page.locator('.error-links a')).toHaveCount(4)
  })
})
