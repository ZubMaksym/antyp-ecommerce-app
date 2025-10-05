import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next.config.ts",
      "next-env.d.ts",
    ],
    rules: {
      semi: ["error", "always"],

      quotes: ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
      "jsx-quotes": ["error", "prefer-single"],

      "no-unused-vars": "warn",
      "no-console": "warn", // remove console.logs
      "react/react-in-jsx-scope": "off", // No import React
      "react/prop-types": "off", // no prop types
    },
  },
];

export default eslintConfig;
