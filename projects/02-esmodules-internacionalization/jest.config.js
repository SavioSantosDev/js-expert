module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
