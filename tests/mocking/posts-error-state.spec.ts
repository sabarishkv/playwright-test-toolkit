import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';

test.describe('Network mocking @mocking', () => {
  test('scoped route intercept simulates an API error response', async ({ page }) => {
    // Scoped to API_BASE_URL only — a mock here can never accidentally
    // match and silently no-op against an unrelated real endpoint.
    await page.route(`${env.API_BASE_URL}/**`, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('about:blank');
    const status = await page.evaluate(async (apiBaseUrl) => {
      const response = await fetch(`${apiBaseUrl}/posts/1`);
      return response.status;
    }, env.API_BASE_URL);

    expect(status).toBe(500);
  });
});
