import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../../src/fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the Playwright home page', async ({ homePage }) => {
  await homePage.open();
});

When('I click the Get started link', async ({ homePage }) => {
  await homePage.clickGetStarted();
});

Then('I should land on the getting-started docs page', async ({ page }) => {
  await expect(page).toHaveURL(/.*intro/);
});
