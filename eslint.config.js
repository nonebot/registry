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

export const restrictedSyntaxJs = ["LabeledStatement", "WithStatement"];

export const javascript = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
      sourceType: "module",
    },
    rules: {
      "array-callback-return": "error",
      "block-scoped-var": "error",
      "constructor-super": "error",
      "dot-notation": "warn",
      eqeqeq: ["error", "smart"],
      "for-direction": "error",
      "getter-return": "error",
      "no-alert": "warn",
      "no-async-promise-executor": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-console": "off",
      "no-const-assign": "error",
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "warn",
      "no-delete-var": "error",
      "no-dupe-args": "error",
      "no-dupe-class-members": "error",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-duplicate-imports": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-fallthrough": [
        "warn",
        { commentPattern: String.raw`break[\s\w]*omitted` },
      ],
      "no-func-assign": "error",
      "no-global-assign": "error",
      "no-import-assign": "error",
      "no-inner-declarations": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-lonely-if": "error",
      "no-loss-of-precision": "error",
      "no-misleading-character-class": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-multi-str": "error",
      "no-new-symbol": "error",
      "no-nonoctal-decimal-escape": "error",
      "no-obj-calls": "error",
      "no-octal": "error",
      "no-prototype-builtins": "error",
      "no-redeclare": "error",
      "no-regex-spaces": "error",
      "no-restricted-syntax": ["error", ...restrictedSyntaxJs],
      "no-self-assign": "error",
      "no-setter-return": "error",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-this-before-super": "error",
      "no-undef": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",

      "no-unsafe-negation": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      "no-unused-labels": "error",
      "no-unused-vars": "off",
      "no-useless-backreference": "error",
      "no-useless-catch": "error",
      "no-useless-escape": "error",
      "no-void": "error",
      "no-with": "error",
      "object-shorthand": [
        "error",
        "always",
        { avoidQuotes: true, ignoreConstructors: false },
      ],
      "prefer-arrow-callback": [
        "error",
        { allowNamedFunctions: false, allowUnboundThis: true },
      ],
      "prefer-const": [
        "warn",
        { destructuring: "all", ignoreReadBeforeAssign: true },
      ],
      "prefer-exponentiation-operator": "error",
      "prefer-regex-literals": ["error", { disallowRedundantWrapping: true }],
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "require-await": "error",
      "require-yield": "error",
      "unicode-bom": ["error", "never"],
      "use-isnan": [
        "error",
        { enforceForIndexOf: true, enforceForSwitchCase: true },
      ],
      "valid-typeof": ["error", { requireStringLiterals: true }],
      "vars-on-top": "error",
      "wrap-iife": ["error", "any", { functionPrototypeMethods: true }],
    },
  },
];

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

const vueCustomRules = {
  "vue/block-order": ["error", { order: ["script", "template", "style"] }],
  "vue/component-tags-order": [
    "error",
    {
      order: ["script", "template", "style"],
    },
  ],
  "vue/custom-event-name-casing": ["error", "camelCase"],
  "vue/dot-notation": "warn",
  "vue/eqeqeq": ["error", "smart"],
  "vue/html-self-closing": [
    "error",
    {
      html: {
        component: "always",
        normal: "always",
        void: "any",
      },
      math: "always",
      svg: "always",
    },
  ],
  "vue/max-attributes-per-line": "off",

  "vue/multi-word-component-names": "off",
  "vue/no-constant-condition": "warn",
  "vue/no-empty-pattern": "error",
  "vue/no-loss-of-precision": "error",
  "vue/no-unused-refs": "error",
  "vue/no-useless-v-bind": "error",

  "vue/no-v-html": "off",
  "vue/object-shorthand": [
    "error",
    "always",
    {
      avoidQuotes: true,
      ignoreConstructors: false,
    },
  ],
  "vue/one-component-per-file": "off",
  "vue/padding-line-between-blocks": ["error", "always"],
  "vue/prefer-template": "error",
  "vue/require-default-prop": "off",
  "vue/require-prop-types": "off",
};

const vue3Rules = {
  ...pluginVue.configs.base.rules,
  ...pluginVue.configs["vue3-essential"].rules,
  ...pluginVue.configs["vue3-strongly-recommended"].rules,
  ...pluginVue.configs["vue3-recommended"].rules,
};

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
        parser: tseslint.parser,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      vue: pluginVue,
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...vue3Rules,
      ...vueCustomRules,
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

export const unocss = {
  name: "unocss",
  plugins: {
    unocss: pluginUnoCSS,
  },
  rules: {
    "unocss/order": "warn",
    "unocss/blocklist": "error",
  },
};

export default [
  ...javascript,
  ...typescript,
  ...vue,
  imports,
  ...prettier,
  ...unicorn,
  ignores,
  unocss,
];
