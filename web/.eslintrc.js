// const prettierOptions = require("./.prettierrc")

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard", "@vue/typescript/recommended"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": ["warn"],
    indent: ["error", 2],
    "@typescript-eslint/indent": ["warn", 2],
    quotes: "off",
    "@typescript-eslint/quotes": ["warn"],
    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": ["off"]
    // "prettier/prettier": ["error", prettierOptions]
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        mocha: true
      }
    }
  ]
}
