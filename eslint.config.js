import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { createConfigForNuxt } from '@nuxt/eslint-config';

export default createConfigForNuxt({
  features: {
    tooling: true,
  },
}).prepend([
  eslintPluginPrettierRecommended,
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unused-vars':
        process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      '@typescript-eslint/no-unused-vars': [
        process.env.NODE_ENV === 'production' ? 'error' : 'off',
      ],
    },
    ignores: ['coverage', 'playground/.*', 'dist', '.nuxt', 'node_modules'],
  },
]);
