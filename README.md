# Playwright + TypeScript Test Framework

A starter scaffold covering UI, API, visual regression, accessibility, and network-mocking tests. Example tests run against placeholder targets (playwright.dev, jsonplaceholder.typicode.com) — swap `UI_BASE_URL`/`API_BASE_URL` in `.env` to point at a real app.

## Prerequisites

- Node.js `>=20.19.0` (or `>=22.13.0`/`>=24`) — required by the ESLint toolchain; see `engines` in `package.json`
- npm `>=10`

## Getting started

```bash
npm install
npx playwright install --with-deps   # downloads browser binaries (~few hundred MB)
cp .env.example .env
npm test
```

Then explore:

```bash
npm run test:ui        # interactive UI mode — best way to explore the suite
npm run report          # view the last HTML report
```

If `npx playwright install` fails to download browsers (e.g. restricted network/proxy/sandbox), see [Troubleshooting](#troubleshooting) below.

## Project structure

```
├── .claude/
│   └── skills/                # Claude Code skills — see docs/claude-skills.md
│       ├── add-page-object/
│       ├── add-api-client/
│       └── add-test/
├── .mcp.json                  # Playwright MCP server registration (AI-driven browser exploration)
├── src/
│   ├── pages/                 # Page Object Models — locators + actions only, no assertions
│   ├── components/            # Reusable UI fragments shared across pages
│   ├── api/                   # API clients, one per resource
│   ├── fixtures/              # test.extend() wiring; merged TestFixtures type
│   ├── data/                  # Synthetic test data factories (faker-based)
│   ├── config/                # Validated, typed environment config
│   └── utils/                 # Generic test helpers
├── tests/
│   ├── ui/
│   │   ├── smoke/              # @smoke — fast, critical-path checks
│   │   └── regression/         # @regression — broader coverage
│   ├── api/                    # @api — no browser, hits the API directly
│   ├── visual/                 # @visual — screenshot baseline comparisons
│   ├── a11y/                   # @a11y — axe-core WCAG violation checks
│   └── mocking/                # @mocking — page.route() interception examples
├── docs/                      # Reference docs — see table below
├── .env.example
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── README.md                  # you are here
└── CONTRIBUTING.md
```

## How tests are organized

Tests are grouped **by test type**, not by feature (see [docs/architecture.md](./docs/architecture.md#why-tests-are-grouped-by-type-not-by-feature) for why). Each folder maps 1:1 to an npm script and a tag:

| Folder | Tag | Command |
|---|---|---|
| `tests/ui/smoke/` | `@smoke` | `npm run test:smoke` |
| `tests/ui/regression/` | `@regression` | `npm run test:regression` |
| `tests/api/` | `@api` | `npm run test:api` |
| `tests/visual/` | `@visual` | `npm run test:visual` |
| `tests/a11y/` | `@a11y` | `npm run test:a11y` |
| `tests/mocking/` | `@mocking` | `npm run test:mocking` |

Full conventions (tagging, fixture scope, locator strategy) are in [docs/writing-tests.md](./docs/writing-tests.md). To add a new test, follow [CONTRIBUTING.md](./CONTRIBUTING.md) or run the `.claude/skills/add-test` skill.

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

## Documentation

| Doc | Covers |
|---|---|
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to add a page object, API client, test, or skill; pre-PR checklist |
| [docs/architecture.md](./docs/architecture.md) | Why fixture-based composition, `src/` vs `tests/`, test-type organization, what's deliberately deferred |
| [docs/writing-tests.md](./docs/writing-tests.md) | Locator strategy, tagging, fixture scope, visual/a11y/mocking conventions |
| [docs/environments.md](./docs/environments.md) | Layered `.env` config, adding a new target environment |
| [docs/security.md](./docs/security.md) | Secrets, auth state, synthetic test data, artifact hygiene |
| [docs/claude-skills.md](./docs/claude-skills.md) | What `.claude/skills/` is, existing skills, how to add a new one |

## Troubleshooting

**`npx playwright install` fails with `ENOTFOUND cdn.playwright.dev` or a timeout.** The environment can't reach Playwright's browser CDN (common in sandboxed/offline/restricted-network setups). Run the install from a machine/network with unrestricted internet access — `npm install` itself doesn't need it, only the browser binary download does.

**`npm install` prints an `EBADENGINE` warning.** Your Node version is below what the ESLint toolchain expects (see [Prerequisites](#prerequisites)). It's a warning, not a failure — upgrade Node if you also want lint to run without noise.

**A visual test fails on first run with "no baseline found."** Expected — there's no committed baseline yet for a new snapshot. Run `npm run test:visual:update` once, review the generated image, then commit it.

**Fixture callback signature errors (`First argument must use the object destructuring pattern`).** Playwright statically inspects fixture function signatures — the first parameter must be a literal destructuring pattern (`{ page }` or `{}`), even if unused. See `src/fixtures/index.ts` for the `{}` + eslint-disable pattern used when no input fixtures are needed.
