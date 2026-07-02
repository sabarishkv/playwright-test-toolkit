# Environments

An **environment** here just means "which set of settings (like URLs) the tests should use." You might want to run the same tests against your local machine, a staging server, or a production server — this is how we switch between them.

## How it works

Settings live in `.env` files. When tests start, `src/config/env.ts` does two things:

1. Loads `.env` first.
2. Then loads `.env.<TEST_ENV>` on top of it, if that file exists, overriding anything that's different.

`TEST_ENV` defaults to `local`. To run against a different environment:

```bash
TEST_ENV=staging npm test
```

This loads `.env`, then layers `.env.staging` on top of it.

Every setting is checked as soon as the tests start. If something required is missing or wrong, you'll get a clear error message right away, instead of a confusing failure in the middle of a test run.

## Adding a new environment

1. Create a new file named `.env.<name>` (this file should never be committed to git — it's for your machine only).
2. In it, set only the values that are *different* from `.env`. You don't need to repeat everything.
3. Run your tests with `TEST_ENV=<name>`.

## What settings exist today

| Setting | What it's for | Default value |
|---|---|---|
| `TEST_ENV` | Which environment file to layer on top | `local` |
| `UI_BASE_URL` | The website the UI tests open | `https://playwright.dev` |
| `API_BASE_URL` | The API the API tests and mocks call | `https://jsonplaceholder.typicode.com` |

If you add a new required setting, also add it to `envSchema` in `src/config/env.ts`. That way, a missing value is caught right away instead of causing a confusing error later on.
