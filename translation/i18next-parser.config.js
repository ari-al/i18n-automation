// translation/i18next-parser.config.js

const path = require("path");

const localeDefaultPack = require("./default-pack.json");

const COMMON_EXTENSIONS = "**/*.{js,jsx,ts,tsx,html}";

module.exports = {
  createOldCatalogs: false,
  keepRemoved: true,
  keySeparator: false,
  locales: Object.keys(localeDefaultPack["default-translations"]),
  namespaceSeparator: false,
  // output: 'locales/$LOCALE/$NAMESPACE.json',
  output: path.join(
    __dirname,
    "..",
    "app/i18n/locales",
    "$LOCALE",
    "$NAMESPACE.json"
  ),

  // 어떤 파일을을 파싱할 것인지 정함
  input: [`../app/${COMMON_EXTENSIONS}`, "!**/node_modules/**", "!../.next/**"],
  defaultValue: (locale, namespace, key) => {
    if (localeDefaultPack["default-language"] === locale) {
      return key;
    } else {
      return "";
    }
  },
};
