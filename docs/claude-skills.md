# AI Skills Folder (.claude/skills)

This project uses Claude Code, an AI coding assistant, to help build and maintain it. `.claude/skills/` is where we keep step-by-step instructions that tell the AI exactly how we like new code written here, so it doesn't have to guess.

**In this doc:** [What's here today](#whats-in-this-folder-today) · [Skill file format](#what-a-skill-file-looks-like) · [When to add one](#when-to-add-a-new-skill) · [When not to](#when-not-to-add-a-skill) · [.mcp.json](#mcpjson)

---

## What's in this folder today

```
.claude/skills/
├── add-page-object/SKILL.md   # steps to add a new Page Object
├── add-api-client/SKILL.md    # steps to add a new API client
└── add-test/SKILL.md          # steps to add a new test in the right place
```

These match the same three things explained in `CONTRIBUTING.md`. Think of `CONTRIBUTING.md` as the version a person reads, and these skill files as the version the AI follows. If our conventions change, update both.

---

## What a skill file looks like

Each skill is a folder with one file inside it, called `SKILL.md`:

```markdown
---
name: kebab-case-name
description: One line explaining what this skill does and when to use it
---

# A short, clear title

Numbered steps, written clearly enough that following them produces
code matching this project's style, without needing to guess.
```

A few tips:
- The `name` should match the folder name.
- The `description` should be specific. "Scaffold a new Page Object" is more useful than "helps with pages," because it's easier to match to the right task.
- Point to a real, existing file as an example wherever you can (for example, "look at `src/pages/home.page.ts`"). Steps that only describe a pattern in the abstract tend to go out of date faster than steps that point at real, working code.

---

## When to add a new skill

Add one when you notice you're explaining the same steps more than once, or when a new pattern needs to be followed consistently by everyone (including the AI) going forward.

1. Create a new folder: `.claude/skills/<skill-name>`
2. Write `.claude/skills/<skill-name>/SKILL.md` using the format above.
3. Point to at least one real example file already in the project.
4. Add a link to it from `CONTRIBUTING.md`, and from the table in `README.md` if it's a common enough task.
5. Try it out yourself before trusting it — run it and check the result looks like what you'd have written by hand.

---

## When not to add a skill

- For something you'll only ever do once. It's not worth writing down.
- For something that's really just "go read this doc." Link to the doc instead — a skill should help you *build* something, not just repeat information that already exists elsewhere.
- For a pattern that's still changing. Get it right in the code first, with a real example or two, then write the skill once it's settled.

---

## `.mcp.json`

This file lets an AI agent open and control a real web browser directly while it's helping write tests — for example, to check what a button is actually called before writing a locator for it. It doesn't affect how the tests themselves run; it's just a helper for the AI while writing new tests. It's set up but not connected to anything specific yet, since there's no real app to explore.
