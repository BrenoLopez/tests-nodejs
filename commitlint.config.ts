import type { UserConfig } from "@commitlint/types";

const configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [2, "always"],
    "body-empty": [2, "always"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};
export default configuration;
