import { Page } from '@playwright/test';

/**
 * Shared behavior for all Page Objects. Prefer role/label/test-id locators
 * (see docs/writing-tests.md) — this base class only holds navigation and
 * waits that are genuinely common across pages, not per-page selectors.
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async title(): Promise<string> {
    return this.page.title();
  }
}
