import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  {
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [prettierConfig],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'no-console': [1, {allow: ['warn']}],
    },
  },
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
