import { Config } from "jest";
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["index.ts", "./src/core/domain/errors"],
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "ts", "json"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
} as Config;
