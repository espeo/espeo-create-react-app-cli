const prettier = require("prettier");

const prettify = code => prettier.format(
  code,
  {
    parser: 'typescript',
    htmlWhitespaceSensitivity: 'strict',
    trailingComma: 'all',
    tabWidth: 2,
    singleQuote: true
  }
);

module.exports = prettify;
