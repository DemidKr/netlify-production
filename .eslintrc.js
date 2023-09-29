/* eslint-env node */

module.exports = {
  overrides: [
    {
      files: ["**/*.js"],
      rules: {
        "no-useless-escape": "off",
      },
    },
    {
      files: ["**/*.{ts,tsx}"],
    },
  ],
};
