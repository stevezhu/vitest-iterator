module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      files: ['.eslintrc.cjs', '*.config.*', 'package-scripts.js'],
      env: {
        node: true,
      },
    },
    {
      files: ['*.{ts,tsx}'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
  ],
};
