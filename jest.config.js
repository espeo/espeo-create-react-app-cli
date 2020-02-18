module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'node',
};
