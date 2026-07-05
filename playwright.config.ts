import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { env } from './src/config/env';

const bddTestDir = defineBddConfig({
  features: 'tests/bdd/features/**/*.feature',
  // Including src/fixtures/index.ts lets bddgen auto-detect that step files import
  // `test` from our shared fixtures, so generated tests use the same fixtures as
  // every other test type (homePage, postsClient, checkA11y, ...).
  steps: ['tests/bdd/steps/**/*.ts', 'src/fixtures/index.ts'],
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: env.UI_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api',
      testDir: './tests/api',
    },
    {
      name: 'bdd',
      testDir: bddTestDir,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium',
      testIgnore: ['**/api/**', '**/bdd/**'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: ['**/api/**', '**/bdd/**'],
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: ['**/api/**', '**/bdd/**'],
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
