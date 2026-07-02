import { test, expect } from '../../../src/fixtures';

test.describe('Get started flow @regression', () => {
  test('navigates to the docs intro page', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.clickGetStarted();

    await expect(page).toHaveURL(/.*intro/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
