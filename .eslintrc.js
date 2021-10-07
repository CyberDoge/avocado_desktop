process.env.BABEL_ENV = "development"
process.env.NODE_ENV = "development"
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "eslint:recommended",
    "airbnb"
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      arrowFunctions: true,
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module",
    parser: "@babel/eslint-parser"
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "comma-dangle": ["error", "never"],
    "no-underscore-dangle": ["error", { allowAfterThis: true }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "newline-before-return": "error"
  }
}
