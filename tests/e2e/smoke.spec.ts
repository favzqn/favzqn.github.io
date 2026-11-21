import { test, expect } from '@playwright/test'

test.describe('site smoke', () => {
  test('homepage: hero, quick links, 7 recommendations', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Fauzan')
    await expect(page.locator('.chips a')).toHaveCount(4)
    await expect(page.locator('blockquote')).toHaveCount(7)
    await expect(page.locator('.rec-author a')).toHaveCount(7)
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
    await expect(page.locator('.related .related-title')).toHaveCount(2)
    await expect(page.locator('.post-cta-link')).toBeVisible()
  })

  test('hire page: recommendations block before CTA', async ({ page }) => {
    await page.goto('/hire/')
    await expect(page.locator('blockquote')).toHaveCount(2)
    await expect(page.getByRole('heading', { name: "Let's Talk" })).toBeVisible()
  })

  test('projects filter renders and all cards present', async ({ page }) => {
    await page.goto('/projects/')
    await expect(page.locator('.filter-chip')).not.toHaveCount(0)
    await expect(page.locator('.project-card')).toHaveCount(11)
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

  test('unknown URL returns 404 with navigation', async ({ page }) => {
    const res = await page.goto('/no-such-page')
    expect(res?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('404')
    await expect(page.locator('.error-links a')).toHaveCount(4)
  })
})
