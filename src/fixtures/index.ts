import { request as pwRequest, APIRequestContext } from '@playwright/test';
import { test as base } from 'playwright-bdd';
import { HomePage } from '../pages/home.page';
import { PostsClient } from '../api/posts.client';
import { env } from '../config/env';
import { checkA11y as runA11yCheck } from './a11y.fixture';

export interface TestFixtures {
  homePage: HomePage;
  checkA11y: typeof runA11yCheck;
}

export interface WorkerFixtures {
  apiRequestContext: APIRequestContext;
  postsClient: PostsClient;
}

/**
 * Fixture scope is deliberate, not incidental:
 * - `homePage` is test-scoped: it wraps `page`, which Playwright creates fresh per test.
 * - `apiRequestContext`/`postsClient` are worker-scoped: the underlying HTTP context has
 *   no per-test state to isolate, so it's created once per worker and reused across tests
 *   in that worker rather than rebuilt for every single test.
 */
export const test = base.extend<TestFixtures, WorkerFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // eslint-disable-next-line no-empty-pattern -- Playwright requires literal destructuring here
  checkA11y: async ({}, use) => {
    await use(runA11yCheck);
  },

  apiRequestContext: [
    // eslint-disable-next-line no-empty-pattern -- Playwright requires literal destructuring here
    async ({}, use) => {
      const context = await pwRequest.newContext({ baseURL: env.API_BASE_URL });
      await use(context);
      await context.dispose();
    },
    { scope: 'worker' },
  ],

  postsClient: [
    async ({ apiRequestContext }, use) => {
      await use(new PostsClient(apiRequestContext));
    },
    { scope: 'worker' },
  ],
});

export { expect } from '@playwright/test';
