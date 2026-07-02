import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get getStartedLink() {
    return this.page.getByRole('link', { name: 'Get started' });
  }

  get heading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }
}
