import { defineConfig } from '@playwright/test';

/**
 * Deterministic Playwright Configuration for YardMath E2E Suite.
 *
 * Requirements:
 * - CI always starts a fresh server from the current build.
 * - Local server reuse is prohibited by default, allowed only with PLAYWRIGHT_REUSE_SERVER=true.
 * - Global setup verifies the expected production build exists (.next/BUILD_ID) before running tests.
 * - Uses Google Chrome headless (or Chromium if PLAYWRIGHT_CHROMIUM is specified).
 */
const isCI = Boolean(process.env.CI);
const allowServerReuse = !isCI && process.env.PLAYWRIGHT_REUSE_SERVER === 'true';

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'http://localhost:3005',
    channel: process.env.PLAYWRIGHT_CHROMIUM ? undefined : 'chrome',
    headless: true,
  },
  webServer: {
    command: 'npx next start -p 3005',
    url: 'http://localhost:3005',
    reuseExistingServer: allowServerReuse,
    timeout: 120000,
  },
});
