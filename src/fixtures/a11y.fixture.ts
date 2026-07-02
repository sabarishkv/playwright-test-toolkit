import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

/**
 * Runs an axe-core scan against the current page and asserts there are
 * zero violations. Wrapped as a fixture so every a11y test is one line:
 *   await checkA11y(page)
 */
export async function checkA11y(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations, formatViolations(results.violations)).toEqual([]);
}

function formatViolations(violations: { id: string; help: string; nodes: unknown[] }[]): string {
  if (violations.length === 0) return '';
  return violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`).join('\n');
}
