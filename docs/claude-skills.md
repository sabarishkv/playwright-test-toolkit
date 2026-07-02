# Claude Code Skills

## What lives here

`.claude/skills/` holds project-scoped Claude Code skills — markdown instructions that let an AI agent (or a human following along) scaffold new code that matches this project's conventions by construction, instead of relying on someone remembering `CONTRIBUTING.md` every time.

Each skill is a folder containing one `SKILL.md`:

```
.claude/skills/
├── add-page-object/SKILL.md   # scaffold a new Page Object
├── add-api-client/SKILL.md    # scaffold a new API client
└── add-test/SKILL.md          # scaffold a new test in the right folder, with the right tag
```

These mirror the three things `CONTRIBUTING.md` documents — the skill is the executable version, the doc is the readable version. Keep both in sync when conventions change.

## `SKILL.md` format

```markdown
---
name: kebab-case-name
description: One line — what this skill does and when to use it
---

# Human-readable title

Steps, numbered, specific enough that following them produces code
matching this project's conventions without guessing.
```

- `name` matches the folder name.
- `description` is what a skill-discovery system matches against — be concrete, not generic ("scaffold a new Page Object" beats "helps with pages").
- The body is a numbered checklist referencing real files in this repo (e.g. "reference `src/pages/home.page.ts`"), not abstract advice — point at a concrete example every time one exists.

## Adding a new skill

Add one when a task in this repo is done often enough, and precisely enough, that writing down the exact steps saves more time than it costs to maintain. Signs it's worth it: you've explained the same steps in a PR review twice, or a new convention (e.g. a new fixture pattern, a new test type folder) needs to be followed consistently by future contributors.

1. `mkdir .claude/skills/<skill-name>`
2. Write `.claude/skills/<skill-name>/SKILL.md` following the format above.
3. Reference at least one real, existing file in this repo as the canonical example — skills that describe patterns abstractly go stale faster than ones that point at working code.
4. Cross-link it from `CONTRIBUTING.md` (add a line under the relevant section) and from the table in `README.md` if it's broad enough to be a top-level workflow.
5. Try it — actually invoke it and check the output matches what you'd have written by hand.

## Don't add a skill for

- One-off tasks that won't recur.
- Anything that's just "read this doc" — link the doc instead; a skill should produce or change something, not just restate `docs/writing-tests.md`.
- Conventions that are still in flux. Stabilize the pattern in code first (one or two real examples), then write the skill once there's something concrete to point at.

## `.mcp.json`

Alongside skills, `.mcp.json` registers Playwright's MCP server, which lets an AI agent drive a real browser directly (inspect the DOM/accessibility tree, try a locator, see it act) while writing new tests — useful during authoring, not something the test suite itself depends on. It's a stub for now since there's no real application to explore yet; revisit once one exists.
