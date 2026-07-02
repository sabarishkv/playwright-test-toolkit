---
name: add-api-client
description: Scaffold a new API client following this project's conventions (worker-scoped fixture wiring, one client per resource)
---

# Add API Client

Use this when asked to add an API client for a new resource/service in this project.

## Steps

1. Ask which resource/endpoint(s) this client wraps if not given.
2. Create `src/api/<resource>.client.ts`:
   - `export class <Resource>Client extends BaseClient`
   - One async method per operation (`list()`, `get(id)`, `create(payload)`, etc.), each returning the raw `APIResponse` — let the caller decide whether/how to parse or assert.
   - Define and export any request/response TypeScript interfaces alongside the client.
3. Decide fixture scope:
   - If the client holds no per-test state (the common case), wire it into `src/fixtures/index.ts` as **worker-scoped** (`{ scope: 'worker' }`), reusing the shared `apiRequestContext` — follow the `postsClient` pattern exactly.
   - Only use test scope if the client must be recreated per test (e.g. it depends on per-test auth state).
4. Add it to the `WorkerFixtures` (or `TestFixtures`) interface.
5. Confirm it compiles: `npm run typecheck`.

Reference `src/api/posts.client.ts` and its fixture entry as the canonical example.
