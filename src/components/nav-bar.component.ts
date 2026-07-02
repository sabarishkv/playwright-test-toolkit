import { Page } from '@playwright/test';

/**
 * Example of a reusable component shared across multiple pages.
 * Components hold locators/actions scoped to one fragment of the DOM,
 * distinct from Page Objects which represent a full page.
 */
export class NavBarComponent {
  constructor(private readonly page: Page) {}

  private get root() {
    return this.page.getByRole('navigation');
  }

  link(name: string) {
    return this.root.getByRole('link', { name });
  }

  async open(name: string): Promise<void> {
    await this.link(name).click();
  }
}
