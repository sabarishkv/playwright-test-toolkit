import { test } from '../../src/fixtures';

test.describe('Home page accessibility @a11y', () => {
  test('has no detectable WCAG violations', async ({ homePage, page, checkA11y }) => {
    await homePage.open();
    await checkA11y(page);
  });
});
