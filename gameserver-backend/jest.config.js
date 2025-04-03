/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};