// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist', 'node_modules'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // active les règles strictes
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module', // 🔥 Corrigé (NestJS utilise ESM en flat config)
      parserOptions: {
        project: ['./tsconfig.json'], // 🔥 obligatoire pour que les types soient résolus
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // 🔥 Désactive seulement celles qui posent problème
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  }
);
