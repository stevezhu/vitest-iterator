module.exports = {
  scripts: {
    build: {
      default: 'tsup src/index.ts --format cjs,esm --dts',
    },
  },
};
