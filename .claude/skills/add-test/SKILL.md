---
name: add-test
description: Scaffold a new UI, API, visual, a11y, or mocking test following this project's conventions (folder, tag, fixture imports)
---

# Add Test

Use this when asked to add a new test in this project.

## Steps

1. Determine the test type and its target folder + tag:

   | Type | Folder | Tag |
   |---|---|---|
   | UI smoke | `tests/ui/smoke/` | `@smoke` |
   | UI regression | `tests/ui/regression/` | `@regression` |
   | API | `tests/api/` | `@api` |
   | Visual regression | `tests/visual/` | `@visual` |
   | Accessibility | `tests/a11y/` | `@a11y` |
   | Network mocking | `tests/mocking/` | `@mocking` |

2. Import `test`/`expect` from `../../src/fixtures` (adjust relative depth), never directly from `@playwright/test` — this is what wires in the project's Page Objects, API clients, and helpers.
3. Wrap the test(s) in a `test.describe('<subject> <tag>', ...)` block, with the tag in the describe title so it's picked up by the matching `npm run test:*` script.
4. Use fixtures already defined in `src/fixtures/index.ts` (`homePage`, `postsClient`, `checkA11y`, etc.) instead of constructing Page Objects/clients manually.
5. Follow locator strategy in `docs/writing-tests.md` (`getByRole` first) and never use `page.waitForTimeout()`.
6. Run it: `npx playwright test <path-to-new-spec>`.

Reference the existing specs in each folder (e.g. `tests/ui/smoke/home.spec.ts`, `tests/api/posts.spec.ts`) as canonical examples.
