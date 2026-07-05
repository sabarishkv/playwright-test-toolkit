const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const playwright = require('eslint-plugin-playwright');
const security = require('eslint-plugin-security');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      security,
    },
    rules: {
      ...security.configs.recommended.rules,
    },
  },
  {
    files: ['tests/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/no-nth-methods': 'warn',
      'playwright/expect-expect': ['warn', { assertFunctionNames: ['checkA11y'] }],
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { require: 'readonly', module: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Step definitions call expect() inside Given/When/Then callbacks, not inside a literal
    // test() block — playwright-bdd generates the real test() wrapper at build time, so this
    // rule can't see it statically. The expect() itself still runs inside a real test at runtime.
    files: ['tests/bdd/steps/**/*.ts'],
    rules: {
      'playwright/no-standalone-expect': 'off',
    },
  },
  prettier,
  {
    ignores: ['node_modules', 'playwright-report', 'test-results', 'dist', '.features-gen'],
  },
);
