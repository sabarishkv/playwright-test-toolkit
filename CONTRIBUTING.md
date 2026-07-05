# Contributing

This page walks through how to add the most common things to this project: a new page, a new API client, a new test, or a new AI skill. If you're new here, [docs/architecture.md](./docs/architecture.md) explains *why* things are set up this way, in case any of these steps feel unfamiliar.

**Contents:** [Page Object](#adding-a-new-page-object) · [API client](#adding-a-new-api-client) · [Test](#adding-a-new-test) · [BDD scenario](#adding-a-new-bdd-scenario) · [AI skill](#adding-a-new-ai-skill) · [Fixture scope](#fixtures-fresh-per-test-or-shared) · [Locators](#how-to-find-things-on-a-page) · [Before a PR](#before-opening-a-pull-request)

---

## Adding a new Page Object

A "Page Object" is a file that describes one web page: what's on it, and how to interact with it (click this, read that). Tests use it instead of finding elements on the page by hand.

1. Create a new file: `src/pages/<name>.page.ts`, and have it extend `BasePage`.
2. Add each element you need as a getter, using `getByRole`, `getByLabel`, or `getByTestId` — not CSS selectors or XPath. Our linter will flag those.
3. Add actions as methods, like `clickX()` or `open()`. Don't put `expect()` checks inside a Page Object — checks belong in the test file, not here.
4. Register it in `src/fixtures/index.ts` as a fixture (see the [fixture scope](#fixtures-fresh-per-test-or-shared) section below for what that means), scoped per test.
5. Or, skip the manual steps and run the `.claude/skills/add-page-object` AI skill to do this for you.

---

## Adding a new API client

An "API client" is a small file that wraps calls to one part of an API, so tests don't need to know the exact URL or request details.

1. Create a new file: `src/api/<resource>.client.ts`, extending `BaseClient`, with one method per action (like `list()`, `get()`, `create()`).
2. If the client doesn't need to remember anything between tests (most won't), register it in `src/fixtures/index.ts` as a **worker-scoped** fixture — look at `postsClient` for an example. This means it's created once and reused, instead of being rebuilt for every single test.
3. Or run the `.claude/skills/add-api-client` AI skill.

---

## Adding a new test

1. Choose the right folder for what you're testing: `tests/ui/smoke`, `tests/ui/regression`, `tests/api`, `tests/visual`, `tests/a11y`, `tests/mocking`, or `tests/bdd` (see the [next section](#adding-a-new-bdd-scenario) for BDD specifically).
2. Add the matching tag to your `describe` block (`@smoke`, `@regression`, `@api`, `@visual`, `@a11y`, or `@mocking`), so it gets picked up by the right `npm run test:...` command.
3. Import `test` and `expect` from `../../src/fixtures` — not straight from `@playwright/test`. Importing from our own fixtures file is what gives your test access to things like `homePage` and `postsClient`.
4. Or run the `.claude/skills/add-test` AI skill.

---

## Adding a new BDD scenario

BDD (Behavior-Driven Development) scenarios are written in plain-English Given/When/Then steps, using the [playwright-bdd](https://github.com/vitalets/playwright-bdd) library.

1. Add a `.feature` file under `tests/bdd/features/`, describing the scenario in Given/When/Then steps. Tag the scenario `@bdd`.
2. Add or reuse step definitions under `tests/bdd/steps/`. Each step is a `Given`/`When`/`Then` callback built with `createBdd(test)`, where `test` is imported from `../../../src/fixtures` — the same fixtures every other test uses (`homePage`, `postsClient`, etc.).
3. Run `npm run test:bdd`. This first regenerates real Playwright test files from your `.feature` + step files (into the gitignored `.features-gen/` folder), then runs them.
4. See [docs/writing-tests.md](./docs/writing-tests.md#bdd-tests-given-when-then) for more detail, including common errors and what causes them.

---

## Adding a new AI skill

If you catch yourself explaining the same set of steps more than once, it's worth writing down as a skill instead of relying on memory. See [docs/claude-skills.md](./docs/claude-skills.md) for how skill files are structured, and when adding one is (and isn't) a good idea.

---

## Fixtures: fresh per test, or shared

A "fixture" is a ready-made object Playwright hands your test automatically. Fixtures come in two flavors:

- **Per test**: a new one is built for every single test. Use this for anything tied to the page itself, like a Page Object.
- **Per worker**: one is built and reused across every test running in that worker (Playwright runs several tests at once, each in its own "worker"). Use this for things with no state to leak between tests, like a shared API connection.

> See [docs/writing-tests.md](./docs/writing-tests.md#fixtures-fresh-per-test-or-shared) for a diagram of how this looks in practice.

---

## How to find things on a page

In order of preference: `getByRole`, then `getByLabel`/`getByPlaceholder`, then `getByTestId`, then `getByText`. Avoid CSS selectors, XPath, and `nth()` (picking "the 3rd item") — they tend to break as soon as the page's design changes, and our linter will flag them.

---

## Before opening a pull request

Run these three commands and make sure they all pass:

```bash
npm run lint
npm run typecheck
npm test
```
