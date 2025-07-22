module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-var-requires': 'off',

    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // General
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'off', // Use TypeScript version
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['*.test.{js,ts,jsx,tsx}', '*.spec.{js,ts,jsx,tsx}'],
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['*.config.{js,ts,mjs}', '**/setup.{js,ts}', 'src/test/setup.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'off',
        'no-var': 'off', // Allow var in config/setup files
        '@typescript-eslint/no-explicit-any': 'off', // Allow any in setup files
      },
    },
  ],
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '.astro/**/*',
    'coverage/**/*',
    'test-results/**/*',
    'playwright-report/**/*',
    '*.astro', // Temporarily ignore Astro files due to jsx-a11y parser conflicts
    'e2e_test/**/*', // Ignore e2e test files for now
  ],
};
