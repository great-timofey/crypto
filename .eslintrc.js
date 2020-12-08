module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'eslint-config-airbnb',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
  ],
  plugins: ['react', 'prettier', 'react-hooks', 'jsx-a11y', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    createDefaultProgram: true,
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  ignorePatterns: ["schema.ts"],
  rules: {
    'react/style-prop-object': ['off'],
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': ['off'],
    'react/jsx-filename-extension': ['off'],
    'no-return-assign': ['off'],
    'react/jsx-one-expression-per-line': 'off',
    'no-case-declarations': 'off',
    'consistent-return': 'off',
    'react/prop-types': 'off',
    'global-require': 'off',
    'func-names': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/no-cycle': 2,
    'import/extensions': 'off',
    'react/display-name': 'off',
    'spaced-comment': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/no-empty-interface': 0,
  },
};
