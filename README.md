# Playwright + TypeScript Test Framework

This project is a starting point for testing a website and its API, using a tool called Playwright, written in TypeScript.

Right now it points at two example, placeholder targets: `playwright.dev` (a real website, used for the UI tests) and `jsonplaceholder.typicode.com` (a free test API, used for the API tests). Once you have a real app to test, you just change two settings (`UI_BASE_URL` and `API_BASE_URL` in `.env`) and everything points at your app instead.

**Contents:** [What you need](#what-you-need-before-you-start) · [Getting started](#getting-started) · [Project layout](#how-the-project-is-laid-out) · [How tests are organized](#how-tests-are-organized) · [Running tests](#running-tests) · [Other commands](#other-useful-commands) · [Docs](#where-to-read-more) · [Troubleshooting](#troubleshooting)

---

## What you need before you start

- Node.js, version `20.19.0` or newer (also works with `22.13.0+` or `24+`). This is required by our code-quality tooling. The exact version is written in `package.json` under `"engines"`.
- npm, version `10` or newer. npm comes bundled with Node.js, so if you have Node you almost certainly already have this.

---

## Getting started

Run these commands in order, from the project folder:

```bash
npm install                          # installs all the packages this project depends on
npx playwright install --with-deps   # downloads the actual browsers Playwright will control (a few hundred MB)
cp .env.example .env                 # creates your local settings file from the example
npm test                             # runs the full test suite
```

Once that's working, these are worth trying next:

```bash
npm run test:ui   # opens an interactive window where you can watch and step through tests
npm run report    # opens a report of the last test run in your browser
```

If the browser download in step 2 fails, jump to [Troubleshooting](#troubleshooting) below.

---

## How the project is laid out

```
├── .claude/
│   └── skills/                # AI helper instructions — see docs/claude-skills.md
│       ├── add-page-object/
│       ├── add-api-client/
│       └── add-test/
├── .mcp.json                  # lets an AI agent control a real browser while writing tests
├── src/
│   ├── pages/                 # one file per web page: how to find and use things on it
│   ├── components/            # reusable pieces shared across pages (like a nav bar)
│   ├── api/                   # one file per API area, wrapping the actual HTTP calls
│   ├── fixtures/              # wires everything above into the tests automatically
│   ├── data/                  # generates fake test data (names, emails, etc.)
│   ├── config/                # reads and checks the settings in .env
│   └── utils/                 # small shared helper functions
├── tests/
│   ├── ui/
│   │   ├── smoke/              # quick checks that the basics still work (tag: @smoke)
│   │   └── regression/         # deeper checks (tag: @regression)
│   ├── api/                    # tests that call the API directly, no browser needed (tag: @api)
│   ├── visual/                 # tests that compare screenshots (tag: @visual)
│   ├── a11y/                   # accessibility checks (tag: @a11y)
│   ├── mocking/                # tests using faked network responses (tag: @mocking)
│   └── bdd/                    # plain-English Given/When/Then scenarios (tag: @bdd)
│       ├── features/            # .feature files — the scenarios themselves
│       └── steps/                # step definitions, wired to the same fixtures as every other test
├── docs/                      # deeper explanations — see the table further down
├── .env.example                # template for your local settings file
├── playwright.config.ts        # main Playwright settings
├── tsconfig.json                # TypeScript settings
├── package.json                 # project info, dependencies, and commands
├── README.md                    # you are here
└── CONTRIBUTING.md              # how to add new tests, pages, and API clients
```

Don't worry about memorizing all of this. The short version: reusable code lives in `src/`, and the actual tests live in `tests/`, sorted into folders by what kind of test they are.

> **Want a picture of how these pieces connect, not just a file list?** [docs/architecture.md](./docs/architecture.md#the-big-picture) has diagrams showing how a test gets what it needs from `src/`.

---

## How tests are organized

Tests are grouped by **the kind of check they do**, not by which feature they belong to. There's more on why in [docs/architecture.md](./docs/architecture.md#why-tests-are-grouped-by-type-not-by-feature). Each folder lines up with one command and one tag:

| Folder | Tag | Command |
|---|---|---|
| `tests/ui/smoke/` | `@smoke` | `npm run test:smoke` |
| `tests/ui/regression/` | `@regression` | `npm run test:regression` |
| `tests/api/` | `@api` | `npm run test:api` |
| `tests/visual/` | `@visual` | `npm run test:visual` |
| `tests/a11y/` | `@a11y` | `npm run test:a11y` |
| `tests/mocking/` | `@mocking` | `npm run test:mocking` |
| `tests/bdd/` | `@bdd` | `npm run test:bdd` |

Adding a new test? The full how-to is in [docs/writing-tests.md](./docs/writing-tests.md) and [CONTRIBUTING.md](./CONTRIBUTING.md). There's also an AI skill (`.claude/skills/add-test`) that can scaffold one for you.

---

## Running tests

| Command | What it does |
|---|---|
| `npm test` | Runs everything, in every browser |
| `npm run test:ui` | Opens Playwright's interactive UI mode |
| `npm run test:headed` | Runs tests with a visible browser window, instead of hidden in the background |
| `npm run test:smoke` | Runs only the tests tagged `@smoke` |
| `npm run test:regression` | Runs only the tests tagged `@regression` |
| `npm run test:api` | Runs only the API tests |
| `npm run test:visual` | Runs only the visual (screenshot) tests |
| `npm run test:visual:update` | Regenerates the saved screenshots the visual tests compare against |
| `npm run test:a11y` | Runs only the accessibility tests |
| `npm run test:mocking` | Runs only the network-mocking tests |
| `npm run test:bdd` | Regenerates and runs the BDD (Gherkin) scenarios |
| `npm run report` | Opens the report from the last test run |

---

## Other useful commands

- `npm run lint` / `npm run lint:fix` — checks the code for common mistakes (and fixes what it can automatically)
- `npm run format` / `npm run format:check` — tidies up code formatting automatically
- `npm run typecheck` — checks that the TypeScript code is valid, without actually running anything
- `npm run audit` — checks whether any of our dependencies have known security problems

---

## Where to read more

| Doc | What's in it |
|---|---|
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to add a new page, API client, test, or AI skill, and what to check before opening a pull request |
| [docs/architecture.md](./docs/architecture.md) | Why the project is structured the way it is, with diagrams |
| [docs/writing-tests.md](./docs/writing-tests.md) | How to find things on a page, tag tests, and write visual/accessibility/mocking/BDD tests |
| [docs/environments.md](./docs/environments.md) | How settings work, and how to point tests at a different environment |
| [docs/security.md](./docs/security.md) | Rules for keeping secrets and personal data out of the repo |
| [docs/claude-skills.md](./docs/claude-skills.md) | What the `.claude/skills/` folder is and how to add a new AI skill |

---

## Troubleshooting

**`npx playwright install` fails, with an error like `ENOTFOUND cdn.playwright.dev`, or it times out.**
This means your network can't reach the site Playwright downloads browsers from — common on restricted networks, sandboxes, or behind certain proxies. Try again from a network with normal internet access. Note that `npm install` itself doesn't need this connection, only this one extra step does.

**`npm install` prints a warning that says `EBADENGINE`.**
This means your installed Node.js version is older than what our tools expect (see [What you need before you start](#what-you-need-before-you-start)). It's just a warning, not a failure — things will still mostly work, but it's worth upgrading Node if you want the warning to go away.

**A visual test fails the first time you run it, saying something like "no baseline found."**
This is expected. A "baseline" is the saved reference screenshot a visual test compares against, and none exists yet for a brand new test. Run `npm run test:visual:update` once, look at the image it creates to make sure it's correct, and commit it.

**You see an error like `First argument must use the object destructuring pattern`.**
This is a Playwright-specific quirk: it reads your fixture function's first argument directly from the code, so it must be written as `{ page }` or `{}`, even if you don't use it. Look at `src/fixtures/index.ts` for an example of how we handle this.

**`npx bddgen` (or `npm run test:bdd`) fails with `Can't guess test instance` or `createBdd() should use 'test' extended from "playwright-bdd"`.** This means a BDD step file is importing `test` from somewhere other than `src/fixtures/index.ts`, or `src/fixtures/index.ts` itself stopped extending `playwright-bdd`'s `test`. See [docs/writing-tests.md](./docs/writing-tests.md#bdd-tests-given-when-then) for how the BDD wiring works.
