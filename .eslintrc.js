module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
  },
  env: {
    es2021: true,
    browser: true,
    jest: true,
    node: true,
  },
  plugins: [
    'react-hooks',
    'react',
    '@typescript-eslint',
    'eslint-plugin-prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
    'prefer-arrow-callback': 'error',
    'func-style': ['error', 'expression'],
    'arrow-body-style': ['error', 'always'],
    'react/react-in-jsx-scope': 0,
    'react/display-name': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
