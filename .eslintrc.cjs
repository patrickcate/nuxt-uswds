module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@nuxt/eslint-config',
    'plugin:prettier/recommended',
    'plugin:prettier-vue/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
