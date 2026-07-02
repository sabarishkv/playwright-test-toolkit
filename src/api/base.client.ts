import { APIRequestContext } from '@playwright/test';

/**
 * Shared behavior for API clients. Each resource gets its own client
 * (see posts.client.ts) rather than one monolithic API wrapper.
 */
export class BaseClient {
  constructor(protected readonly request: APIRequestContext) {}
}
