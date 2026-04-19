import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    ignores: [".next/**", "node_modules/**", "output/**", "public/**", "dist/**"],
  },
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
