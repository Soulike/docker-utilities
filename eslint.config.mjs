// @ts-check

import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsEslint from 'typescript-eslint';

export default tsEslint.config({
  files: [
    '@packages/**/src/**/*.@(t|j)@(s|sx)',
    '@apps/**/src/**/*.@(t|j)@(s|sx)',
  ],
  extends: [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    prettier,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.eslint.json', './**/tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
