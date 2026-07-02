import { test, expect } from '../../src/fixtures';

test.describe('Home page visual regression @visual', () => {
  test('matches baseline screenshot', async ({ homePage, page }) => {
    await homePage.open();
    await expect(page).toHaveScreenshot('home.png', { maxDiffPixelRatio: 0.02 });
  });
});
