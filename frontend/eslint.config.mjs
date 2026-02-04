import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";

const nextConfig = {
  name: "next/core-web-vitals",
  plugins: {
    "@next/next": nextPlugin,
  },
  rules: {
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-css-js-import": "error",
  },
};

const reactConfig = {
  name: "react/recommended",
  plugins: {
    react: pluginReactConfig,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    ...pluginReactConfig.configs.recommended.rules,
    "react/jsx-uses-react": "error",
    "react/react-in-jsx-scope": "off",
  },
};

export default tseslint.config(
  {
    name: "app/files-to-ignore",
    ignores: [
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/coverage/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  nextConfig,
  reactConfig
);
