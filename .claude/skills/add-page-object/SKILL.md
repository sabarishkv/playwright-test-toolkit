---
name: add-page-object
description: Scaffold a new Page Object following this project's conventions (locator strategy, base class, fixture wiring)
---

# Add Page Object

Use this when asked to add a Page Object for a new page in this project.

## Steps

1. Ask for the page name and its route/path if not given.
2. Create `src/pages/<name>.page.ts`:
   - `export class <Name>Page extends BasePage`
   - Constructor takes `page: Page` and calls `super(page)`
   - Locators as getters using `getByRole`/`getByLabel`/`getByTestId` — never CSS/XPath or `.nth()`
   - Actions as async methods (e.g. `open()`, `clickX()`) — no `expect()` assertions here; assertions belong in the test file
3. Add a test-scoped fixture entry in `src/fixtures/index.ts`:
   ```ts
   <name>Page: async ({ page }, use) => {
     await use(new <Name>Page(page));
   },
   ```
   and add it to the `TestFixtures` interface.
4. Confirm it compiles: `npm run typecheck`.

Reference `src/pages/home.page.ts` and its `homePage` fixture entry as the canonical example.
