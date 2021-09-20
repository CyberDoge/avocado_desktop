module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "comma-dangle": ["error", "never"]
  }
}
