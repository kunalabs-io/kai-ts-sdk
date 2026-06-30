import tseslint from 'typescript-eslint'

// Mirrors the base TypeScript config of the Kai monorepo's eslint.config.ts.
// The monorepo's React blocks and its cross-package no-restricted-imports rule
// are monorepo-specific and intentionally omitted here.
export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'src/gen/**',
      '**/*.config.ts',
      '**/*.config.mts',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '**/*.config.js',
    ],
  },

  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]
