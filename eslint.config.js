import js from '@eslint/js';
import globals from 'globals';
import eslintPluginAstro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier/flat';

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'public/**',
      '.claude/**',
      '.agent/**',
      '.codex/**',
      '**/*.mdx',
    ],
  },
  js.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  prettier,
  {
    files: ['*.config.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];
