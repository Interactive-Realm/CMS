const base = require('../jest.config.base');

module.exports = {
  ...base,
  displayName: 'raffle-core',
  rootDir: '.',
  testMatch: ['<rootDir>/__tests__/**'],
  setupFilesAfterEnv: ['<rootDir>/../setup-jest.js'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/../shared/src/$1'
  }
};