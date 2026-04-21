import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Fauzan Fathurrahman/)
  })

  test('should have navigation links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="/blog"]')).toBeVisible()
    await expect(page.locator('a[href="/experience"]')).toBeVisible()
    await expect(page.locator('a[href="/projects"]')).toBeVisible()
  })

  test('should have theme toggle', async ({ page }) => {
    await page.goto('/')
    const themeToggle = page.locator('button[aria-label*="theme" i]')
    await expect(themeToggle).toBeVisible()
  })

  test('should toggle theme on click', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    
    const initialTheme = await html.getAttribute('class')
    
    const themeToggle = page.locator('button[aria-label*="theme" i]')
    await themeToggle.click()
    
    await page.waitForTimeout(100)
    const newTheme = await html.getAttribute('class')
    
    expect(initialTheme).not.toBe(newTheme)
  })
})
