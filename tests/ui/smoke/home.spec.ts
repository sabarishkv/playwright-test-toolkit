import { test, expect } from '../../../src/fixtures';

test.describe('Home page @smoke', () => {
  test('loads and shows the main heading', async ({ homePage }) => {
    await homePage.open();
    await expect(homePage.heading).toBeVisible();
    await expect(homePage.getStartedLink).toBeVisible();
  });
});
