import js from "@eslint/js";
import pluginUnoCSS from "@unocss/eslint-plugin";
import pluginImport from "eslint-plugin-import-x";
import configPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
import parserVue from "vue-eslint-parser";

export const GLOB_SRC_EXT = "?([cm])[jt]s?(x)";
export const GLOB_SRC = "**/*.?([cm])[jt]s?(x)";

export const GLOB_MARKDOWN = "**/*.md";

export const GLOB_TS = "**/*.?([cm])ts";
export const GLOB_TSX = "**/*.?([cm])tsx";

export const GLOB_VUE = "**/*.vue";

export const lintEnv = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.commonjs,
      ...globals.node,
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
};

export const typescript = tseslint.config({
  extends: [...tseslint.configs.recommended],
  files: [GLOB_TS, GLOB_TSX],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      sourceType: "module",
    },
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
});

export const vue = [
  ...tseslint.config({
    extends: typescript,
    files: [GLOB_VUE],
  }),
  {
    files: [GLOB_VUE],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      vue: pluginVue,
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["vue3-essential"].rules,
      ...pluginVue.configs["vue3-strongly-recommended"].rules,
      ...pluginVue.configs["vue3-recommended"].rules,
      "vue/require-default-prop": "off",
      "vue/multi-word-component-names": 0,
      "vue/no-v-html": 0,
      "vue/component-tags-order": [
        "error",
        {
          order: ["script", "template", "style"],
        },
      ],
    },
  },
];

export const imports = {
  plugins: {
    import: pluginImport,
  },
  rules: {
    "import/no-named-as-default": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          { group: "builtin", pattern: "vue", position: "before" },
          { group: "internal", pattern: "{{@,~}/,#}**" },
        ],
        pathGroupsExcludedImportTypes: [],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
};

export const prettier = [
  configPrettierRecommended,
  {
    rules: {
      "prettier/prettier": "warn",
    },
  },
];

export const unicorn = [
  pluginUnicorn.configs["flat/recommended"],
  {
    rules: {
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prefer-spread": "off",
      "unicorn/no-array-reduce": "warn",
      "unicorn/number-literal-case": "off",
      "unicorn/no-array-for-each": "warn",
    },
  },
];

export const ignores = {
  ignores: [
    "**/node_modules",
    "**/dist",
    "**/package-lock.json",
    "**/yarn.lock",
    "**/pnpm-lock.yaml",
    "**/bun.lockb",

    "**/output",
    "**/coverage",
    "**/temp",
    "**/.temp",
    "**/tmp",
    "**/.tmp",
    "**/.history",
    "**/.husky",
    "**/.vitepress/cache",
    "**/.nuxt",
    "**/.next",
    "**/.vercel",
    "**/.changeset",
    "**/.idea",
    "**/.cache",
    "**/.output",
    "**/.vite-inspect",

    "**/CHANGELOG*.md",
    "**/*.min.*",
    "**/LICENSE*",
    "**/__snapshots__",
    "**/auto-import?(s).d.ts",
    "**/components.d.ts",
  ],
};

export const unocss = [
  {
    name: "unocss",
    plugins: {
      unocss: pluginUnoCSS,
    },
    rules: {
      "unocss/order": "warn",
      "unocss/blocklist": "error",
    },
  },
];

export default [
  lintEnv,
  js.configs.recommended,
  ...typescript,
  ...vue,
  imports,
  ...prettier,
  ...unicorn,
  ignores,
  ...unocss,
];
