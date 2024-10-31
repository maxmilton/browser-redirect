import eslint from '@eslint/js';
import mm from '@maxmilton/eslint-config';
import unicorn from 'eslint-plugin-unicorn';
import ts from 'typescript-eslint';

const OFF = 0;
const ERROR = 2;

export default ts.config(
  eslint.configs.recommended,
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  unicorn.configs['flat/recommended'],
  mm.configs.recommended,
  {
    linterOptions: {
      reportUnusedDisableDirectives: ERROR,
    },
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json'],
        projectService: {
          allowDefaultProject: ['*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // FIXME: Remove this once fixed upstream (incorrectly reports chrome as deprecated).
      '@typescript-eslint/no-deprecated': OFF,

      // prefer to clearly separate Bun and DOM
      'unicorn/prefer-global-this': OFF,

      /* Performance and byte savings */
      // byte savings (minification doesn't currently automatically remove)
      'unicorn/switch-case-braces': [ERROR, 'avoid'],
    },
  },
  {
    ignores: ['**/*.bak', 'coverage/**', 'dist/**'],
  },
);
