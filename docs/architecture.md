# Architecture

## Why fixture-based composition, not constructor Page Objects

Tests declare what they need (`{ homePage, postsClient }`) and Playwright's `test.extend()` injects it, rather than every test manually writing `new HomePage(page)`. This keeps setup/teardown automatic and consistent, and matches current Playwright-recommended practice.

**Considered and rejected:** the Screenplay Pattern (Actors/Tasks/Questions). It scales well for very large, multi-team, domain-driven suites, but it's meaningfully heavier machinery than this project needs. Revisit only if the suite grows to dozens of contributors/domains — not before.

## Why `src/` is separate from `tests/`

All reusable logic — Page Objects, API clients, fixtures, data factories, config, utils — lives in `src/`, outside the `testDir`. Spec files in `tests/` stay declarative: arrange, act, assert. This also means `src/` can be typechecked and linted with the same rules as any other TypeScript code, independent of the test runner.

## Why tests are organized by test type, not by feature

`tests/{ui,api,visual,a11y,mocking}` mirrors the npm scripts (`test:visual`, `test:a11y`, etc.) and the Playwright project config (the `api` project only runs `tests/api`, browser projects ignore it). If the suite grows large enough that feature-based organization becomes more useful than type-based, that's a folder reshuffle, not an architecture change — the fixtures and Page Objects underneath are unaffected either way.

## Deferred, deliberately

- **Component testing** (Playwright CT) — needs real component source to test against; none exists yet in this placeholder scaffold.
- **Performance/Lighthouse tooling** — more useful once there's a real app with real performance budgets to check against.
- **CI workflow** — not requested yet; the npm scripts here are what a CI job would call once one exists.
