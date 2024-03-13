const npsUtils = require('nps-utils');

module.exports = {
  scripts: {
    build: 'tsup',
    lint: npsUtils.concurrent.nps('prettier', 'eslint'),
    test: npsUtils.concurrent({
      test: 'vitest run',
      'test:typecheck': 'vitest --typecheck --run',
      typecheck: 'tsc --noEmit',
    }),
    prettier: {
      default: 'prettier --check .',
      fix: 'prettier --write .',
    },
    eslint: {
      default: 'eslint .',
      fix: 'eslint --fix .',
    },
  },
};
