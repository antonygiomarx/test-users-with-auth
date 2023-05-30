module.exports = {
  extends: "airbnb-typescript-prettier",
  ignorePatterns: ["dist", "node_modules"],
  rules: {
    "import/prefer-default-export": "off",
    "no-useless-constructor": "off",
    "no-underscore-dangle": "off",
    "no-console": "off",
    "import/no-unresolved": "off",
    "class-methods-use-this": "off",
  },
};
