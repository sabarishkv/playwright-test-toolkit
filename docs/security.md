# Security

## Secrets

Never hardcode credentials, tokens, or environment-specific URLs in test files, fixtures, or config. Everything comes from `.env`/`.env.<TEST_ENV>` (gitignored), validated by `src/config/env.ts` at startup. `.env.example` is the only env file committed, and must contain placeholder values only.

## Auth/session state

Once real login flows exist, any `storageState.json` produced by an auth fixture must be written to `.auth/` — gitignored in its entirety. Session cookies/tokens must never be committed, even by accident.

## Test data

`src/data/` factories generate synthetic data via `@faker-js/faker`. Never use real user records, emails, or PII as test fixtures — not even "just for local testing."

## Artifacts

`playwright-report/`, `test-results/`, and `.auth/` are gitignored. Traces and videos can capture whatever was typed into a page during a run (including into password/PII fields) — if these are ever uploaded as CI artifacts, restrict access rather than making them public by default.

Visual regression baselines (`*-snapshots/`) are the one exception: they're intentionally committed, since they're the comparison target, not a run artifact.

## Dependencies

- `package-lock.json` is committed; dependency versions are pinned.
- `npm run audit` runs `npm audit --audit-level=high` as a deliberate, visible check — not assumed to run silently elsewhere.

## Lint-level checks

`eslint-plugin-security` runs across all TypeScript files (unsafe regex, non-literal `require`, etc.), alongside `eslint-plugin-playwright` for framework-specific anti-patterns.

## Network mocking scope

`page.route()` intercepts must be scoped to a specific base URL/path pattern (see `docs/writing-tests.md`), not a broad wildcard — an overly broad mock can silently swallow requests to endpoints you didn't intend to touch, masking real failures.
