# Environments

## How layering works

`src/config/env.ts` loads `.env` first, then `.env.<TEST_ENV>` on top of it (later values override earlier ones). `TEST_ENV` defaults to `local`.

```bash
TEST_ENV=staging npm test
```

loads `.env`, then applies `.env.staging` overrides. All resulting variables are validated against a `zod` schema at import time — a missing or malformed required variable throws immediately with a clear message, rather than silently becoming `undefined` and failing confusingly mid-test.

## Adding a new environment

1. Create `.env.<name>` (gitignored — never commit real environment values).
2. Set whatever subset of variables differs from `.env` (you only need to override what's different).
3. Run with `TEST_ENV=<name>`.

## Current variables

| Variable | Purpose | Default |
|---|---|---|
| `TEST_ENV` | Selects which `.env.<name>` overlay to load | `local` |
| `UI_BASE_URL` | Base URL for UI tests / `playwright.config.ts` `use.baseURL` | `https://playwright.dev` |
| `API_BASE_URL` | Base URL for the API client / mocking tests | `https://jsonplaceholder.typicode.com` |

Update `envSchema` in `src/config/env.ts` whenever a new required variable is introduced, so missing config fails fast instead of surfacing as a confusing runtime error later.
