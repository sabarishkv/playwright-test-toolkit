# Writing Tests

## Locator strategy

Prefer, in priority order:
1. `getByRole` (matches how users/assistive tech perceive the page)
2. `getByLabel` / `getByPlaceholder`
3. `getByTestId`
4. `getByText`

Avoid CSS/XPath selectors and `.nth()` — both break silently on unrelated markup changes. `eslint-plugin-playwright`'s `no-nth-methods` rule flags the latter.

## Tagging convention

Tag `test.describe` blocks (not individual `test()` calls) with the tag that matches the folder:

| Folder | Tag | npm script |
|---|---|---|
| `tests/ui/smoke` | `@smoke` | `test:smoke` |
| `tests/ui/regression` | `@regression` | `test:regression` |
| `tests/api` | `@api` | `test:api` |
| `tests/visual` | `@visual` | `test:visual` |
| `tests/a11y` | `@a11y` | `test:a11y` |
| `tests/mocking` | `@mocking` | `test:mocking` |

## Fixture scope

Defined in `src/fixtures/index.ts`:

- **Test-scoped** (default): fixtures that depend on `page`, since Playwright gives each test its own browser context. Example: `homePage`.
- **Worker-scoped** (`{ scope: 'worker' }`): fixtures with no per-test state — safe and cheaper to create once per worker and reuse. Example: `apiRequestContext`/`postsClient`. Getting this wrong either leaks state across tests (if something stateful is wrongly worker-scoped) or wastes setup time on every single test (if something stateless is wrongly test-scoped).

When adding a new fixture, ask: "does this depend on `page`, or hold state that must not leak between tests?" If no to both, worker-scope it.

## No arbitrary waits

Never use `page.waitForTimeout()` — it's banned by lint (`playwright/no-wait-for-timeout`). Use web-first assertions (`await expect(locator).toBeVisible()`) which auto-retry, instead of sleeping and hoping.

## Visual regression

Baselines live in Playwright's default `*-snapshots/` folders next to each spec and **are committed to git** (they're the thing being compared against, not a build artifact). Update them deliberately with `npm run test:visual:update` after reviewing the diff — never regenerate blindly.

## Accessibility

Use the `checkA11y(page)` fixture — it wraps `@axe-core/playwright` and asserts zero violations. Don't hand-roll axe calls in individual tests.

## Network mocking

Scope `page.route()` patterns to the specific base URL/path being mocked (see `tests/mocking/posts-error-state.spec.ts`). A broad pattern (e.g. `**/*`) risks silently intercepting requests you didn't intend to mock.
