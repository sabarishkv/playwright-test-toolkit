import { test, expect } from '../../src/fixtures';
import { expectOk } from '../../src/utils/test-helpers';

test.describe('Posts API @api', () => {
  test('lists posts', async ({ postsClient }) => {
    const response = await postsClient.list();
    await expectOk(response);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  test('creates a post', async ({ postsClient }) => {
    const response = await postsClient.create({
      userId: 1,
      title: 'Playwright scaffold test post',
      body: 'Created by the API test suite.',
    });
    await expectOk(response);

    const created = await response.json();
    expect(created).toHaveProperty('id');
    expect(created.title).toBe('Playwright scaffold test post');
  });

  test('gets a single post', async ({ postsClient }) => {
    const response = await postsClient.get(1);
    await expectOk(response);

    const post = await response.json();
    expect(post.id).toBe(1);
  });
});
