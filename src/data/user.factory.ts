import { faker } from '@faker-js/faker';

export interface TestUser {
  name: string;
  email: string;
  username: string;
}

/**
 * Always synthetic data — never real user records. See docs/security.md.
 */
export function buildUser(overrides: Partial<TestUser> = {}): TestUser {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    ...overrides,
  };
}
