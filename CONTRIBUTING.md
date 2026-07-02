# Contributing

## Adding a new Page Object

1. Create `src/pages/<name>.page.ts`, extending `BasePage`.
2. Expose locators as getters using `getByRole`/`getByLabel`/`getByTestId` — avoid CSS/XPath selectors (enforced by `eslint-plugin-playwright`).
3. Add actions as methods (`clickX`, `open`); do not put `expect()` assertions in a Page Object — assertions belong in the test.
4. Wire it into `src/fixtures/index.ts` as a test-scoped fixture.
5. Or run the `.claude/skills/add-page-object` skill to scaffold this automatically.

## Adding a new API client

1. Create `src/api/<resource>.client.ts`, extending `BaseClient`, one method per operation.
2. If the client has no per-test state, wire it into `src/fixtures/index.ts` as a **worker-scoped** fixture (see `postsClient` for the pattern) rather than recreating it per test.
3. Or run the `.claude/skills/add-api-client` skill.

## Adding a new test

1. Pick the right folder: `tests/ui/smoke`, `tests/ui/regression`, `tests/api`, `tests/visual`, `tests/a11y`, or `tests/mocking`.
2. Tag the `describe` block with the matching tag (`@smoke`, `@regression`, `@api`, `@visual`, `@a11y`, `@mocking`) so it's included in the right npm script.
3. Import `test`/`expect` from `../../src/fixtures`, not directly from `@playwright/test` — that's what wires in the project's fixtures.
4. Or run the `.claude/skills/add-test` skill.

## Adding a new Claude Code skill

If you find yourself explaining the same scaffolding steps more than once, write it down as a skill instead. See [docs/claude-skills.md](./docs/claude-skills.md) for the `SKILL.md` format and when a new skill is (and isn't) worth adding.

## Fixture scope

- **Test-scoped**: anything derived from `page` (a fresh browser context per test) — e.g. Page Objects.
- **Worker-scoped**: anything with no per-test state that's expensive or pointless to recreate per test — e.g. an API request context. See `docs/writing-tests.md`.

## Locator strategy

Prefer, in order: `getByRole` > `getByLabel`/`getByPlaceholder` > `getByTestId` > `getByText`. Avoid CSS/XPath selectors and `nth()` — they break on markup changes and are the first thing `eslint-plugin-playwright` will flag.

## Before opening a PR

```bash
npm run lint
npm run typecheck
npm test
```
