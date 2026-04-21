import { test, expect } from '@playwright/test'

test.describe('Playground Tools', () => {
  test('should load playground page', async ({ page }) => {
    await page.goto('/playground')
    await expect(page).toHaveTitle(/Playground/)
    await expect(page.locator('h1')).toContainText('Playground')
  })

  test('JSON Formatter should work', async ({ page }) => {
    await page.goto('/playground/json-formatter')
    
    const input = page.locator('#jsonInput')
    const formatBtn = page.locator('#formatBtn')
    const output = page.locator('#jsonOutput')
    
    await input.fill('{"name":"test","value":123}')
    await formatBtn.click()
    
    const outputValue = await output.inputValue()
    expect(outputValue).toContain('"name"')
    expect(outputValue).toContain('"test"')
    expect(outputValue).toMatch(/\n/) // Should be formatted with newlines
  })

  test('Regex Tester should work', async ({ page }) => {
    await page.goto('/playground/regex-tester')
    
    const pattern = page.locator('#regexPattern')
    const testString = page.locator('#testString')
    
    await pattern.fill('\\d+')
    await testString.fill('test 123 and 456')
    
    await page.waitForTimeout(500) // Wait for real-time update
    
    const matchesList = page.locator('#matchesList')
    await expect(matchesList).toContainText('123')
    await expect(matchesList).toContainText('456')
  })

  test('Base64 Encoder should work', async ({ page }) => {
    await page.goto('/playground/base64')
    
    const input = page.locator('#inputText')
    const encodeBtn = page.locator('#encodeBtn')
    const output = page.locator('#outputText')
    
    await input.fill('Hello World')
    await encodeBtn.click()
    
    const outputValue = await output.inputValue()
    expect(outputValue).toBe('SGVsbG8gV29ybGQ=')
  })

  test('Dice Roller should work', async ({ page }) => {
    await page.goto('/playground/dice-roller')
    
    const rollBtn = page.locator('#rollD20Btn')
    const resultValue = page.locator('#resultValue')
    
    await rollBtn.click()
    
    const result = await resultValue.textContent()
    expect(result).not.toBe('-')
    expect(parseInt(result || '0')).toBeGreaterThanOrEqual(1)
    expect(parseInt(result || '0')).toBeLessThanOrEqual(20)
  })
})
