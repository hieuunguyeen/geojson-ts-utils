module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules"],
  testRunner: "jest-circus/runner",
  testMatch: ["**/test.ts"],
};
