const base = require('../jest.config.base');

module.exports = {
  ...base,
  displayName: 'server-core',
  rootDir: '.',
  testMatch: ['<rootDir>/__tests__/**'],
  setupFilesAfterEnv: ['<rootDir>/../setup-jest.js'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/../shared/src/$1'
  }
};