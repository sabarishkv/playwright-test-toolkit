# Security

A short list of rules to keep this project safe — no secrets leaking, and no real personal data ending up in the repo.

**In this doc:** [What's committed vs. not](#whats-committed-and-whats-not) · [Secrets](#never-put-secrets-in-the-code) · [Login sessions](#login-sessions) · [Fake data](#use-fake-data-only) · [Test result files](#test-result-files) · [Dependencies](#keeping-dependencies-safe) · [Automatic checks](#automatic-checks) · [Mocking](#be-careful-with-faked-network-responses)

---

## What's committed, and what's not

The quickest way to know if something belongs in git:

| File or folder | Committed to git? | Why |
|---|---|---|
| `.env.example` | Yes | Placeholder values only — safe to share |
| `.env`, `.env.*` | **No** | Your real settings, possibly including secrets |
| `.auth/` | **No** | Saved login sessions — as sensitive as a password |
| `playwright-report/`, `test-results/` | **No** | Can capture whatever was typed during a test run |
| `*-snapshots/` (visual test baselines) | Yes | These are the reference images tests compare against, not throwaway output |
| `package-lock.json` | Yes | Keeps everyone on the exact same dependency versions |

---

## Never put secrets in the code

> **Rule:** don't type passwords, API keys, tokens, or real URLs directly into test files or config.

All of that belongs in `.env` files, which are never committed to git. The only file that is committed is `.env.example`, and it should only ever contain fake, placeholder values.

---

## Login sessions

Later, once this project tests a real app with a login page, saved login sessions (usually a file called `storageState.json`) must be written into a folder called `.auth/`. That folder is never committed to git. A saved login session is just as sensitive as a password — it should never end up in the repo, even by accident.

---

## Use fake data only

Test data (names, emails, usernames) should always be made up, using the `@faker-js/faker` library in `src/data/`.

> **Never:** copy a real person's information into a test, even "just for a quick local check."

---

## Test result files

Folders like `playwright-report/`, `test-results/`, and `.auth/` are never committed. These can contain recordings of what happened during a test run, including anything typed into the page — like a password. If these files are ever uploaded somewhere (for example, to a CI system), make sure only the right people can access them.

The one exception is the saved screenshots used for visual tests (the `*-snapshots/` folders). Those *are* meant to be committed, since they're the reference images we compare against, not leftovers from a test run.

---

## Keeping dependencies safe

- `package-lock.json` is committed, so everyone installs the exact same versions of every package.
- Run `npm run audit` from time to time to check for known security issues in the packages this project depends on.

---

## Automatic checks

Our linter (`eslint-plugin-security`) automatically checks the code for risky patterns, like unsafe regular expressions. A second linter (`eslint-plugin-playwright`) checks specifically for test-writing mistakes.

---

## Be careful with faked network responses

When faking ("mocking") a network response in a test, always limit it to the exact URL you mean to fake. A mock that's too broad can accidentally catch requests you didn't intend to fake, which can hide real bugs instead of catching them. See [docs/writing-tests.md](./writing-tests.md#faking-network-responses-mocking) for more on this.
