/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'semi': [1, 'always'],
    'eol-last': [1, 'always'],
    'indent': [1, 2, { 'SwitchCase': 1 }],
    'no-multiple-empty-lines': [1, { 'max': 1, 'maxEOF': 0 }],
    'no-trailing-spaces': 1,
    'quotes': [1, 'single'],
  }
};
