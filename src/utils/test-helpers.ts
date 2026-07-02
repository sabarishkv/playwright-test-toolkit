import { APIResponse, expect } from '@playwright/test';

export async function expectOk(response: APIResponse): Promise<void> {
  expect(response.ok(), `Expected OK response, got ${response.status()} for ${response.url()}`).toBeTruthy();
}
