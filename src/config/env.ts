import * as dotenv from 'dotenv';
import * as path from 'path';
import { z } from 'zod';

const testEnv = process.env.TEST_ENV ?? 'local';

// Layered load: base .env first, then .env.<TEST_ENV> overrides it.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, `../../.env.${testEnv}`), override: true });

const envSchema = z.object({
  TEST_ENV: z.string().default('local'),
  UI_BASE_URL: z.string().url().default('https://playwright.dev'),
  API_BASE_URL: z.string().url().default('https://jsonplaceholder.typicode.com'),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid or missing environment variables:\n${parsed.error.issues
        .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
        .join('\n')}`,
    );
  }
  return parsed.data;
}

export const env = loadEnv();
