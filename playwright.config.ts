import { defineConfig } from '@playwright/test'

// Escape hatch: point at a custom Chromium when the bundled revision isn't installed
const executablePath = process.env.PW_CHROMIUM_PATH

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:4321',
    ...(executablePath ? { launchOptions: { executablePath } } : {})
  },
  webServer: {
    command: 'pnpm preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 30000
  }
})
