# Playwright + TypeScript Test Framework

A starter scaffold covering UI, API, visual regression, accessibility, and network-mocking tests. Example tests run against placeholder targets (playwright.dev, jsonplaceholder.typicode.com) — swap `UI_BASE_URL`/`API_BASE_URL` in `.env` to point at a real app.

## Quick start

```bash
npm install
npx playwright install --with-deps
cp .env.example .env
npm test
```

## Running tests

| Command | Runs |
|---|---|
| `npm test` | Everything, all browser projects |
| `npm run test:ui` | Playwright UI mode (interactive) |
| `npm run test:headed` | Headed browser |
| `npm run test:smoke` | Tests tagged `@smoke` |
| `npm run test:regression` | Tests tagged `@regression` |
| `npm run test:api` | API tests only |
| `npm run test:visual` | Visual regression tests |
| `npm run test:visual:update` | Regenerate visual baselines |
| `npm run test:a11y` | Accessibility tests |
| `npm run test:mocking` | Network mocking tests |
| `npm run report` | Open the last HTML report |

## Other scripts

- `npm run lint` / `npm run lint:fix` — ESLint (includes Playwright- and security-specific rules)
- `npm run format` / `npm run format:check` — Prettier
- `npm run typecheck` — `tsc --noEmit`
- `npm run audit` — dependency vulnerability check

## Folder overview

- `src/pages/`, `src/components/` — Page Objects and reusable UI fragments (locators + actions, no assertions)
- `src/api/` — API clients, one per resource
- `src/fixtures/` — `test.extend()` wiring that injects pages/clients/helpers into tests
- `src/data/` — synthetic test data factories (faker-based)
- `src/config/env.ts` — validated, typed environment config
- `tests/` — spec files, organized by test type (`ui/smoke`, `ui/regression`, `api`, `visual`, `a11y`, `mocking`)
- `docs/` — architecture rationale, testing conventions, environment setup, security policy
- `.claude/skills/` — Claude Code skills that scaffold new pages/clients/tests following this project's conventions

See [CONTRIBUTING.md](./CONTRIBUTING.md) before adding new tests, and [docs/](./docs) for the reasoning behind the structure.
