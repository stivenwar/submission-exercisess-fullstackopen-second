import js from '@eslint/js'
import globals from "globals";
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: { ...globals.browser,...globals.node } } },
  { plugins: { js, stylistic },extends: ["js/recommended"] },
    globalIgnores(['./dist/']),
    {

  'rules': {
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ],

    'no-console': 0
  },
}

]);
