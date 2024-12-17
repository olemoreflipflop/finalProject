// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import 'dotenv/config';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  globalSetup: require.resolve('./global-setup.js'),
  use: {
    storageState: 'sessionStorage.json',
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },
  expect: {
    timeout: 7000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'ui',
      use: { ...devices['Desktop Chrome'] },
      testDir: 'tests/ui',
    },
    {
      name: 'api',
      use: {
        baseURL: process.env.BASE_URL,
      },
      testDir: 'tests/api',
    },
  ],
});
