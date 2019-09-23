const path = require("path");
const fs = require("fs");
const generateFile = require("./generateFile");

const generateStore = name => {
  const storeScaffords = ["action", "reducer", "selectors", "index"];

  for (const scaffold of storeScaffords) {
    const testTemplate = path.join(
      __dirname,
      `../templates/store/spec/${scaffold}.test.ts`
    );

    const template = path.join(__dirname, `../templates/store/${scaffold}.ts`);

    if (scaffold && name) {
      generateFile(name, template, scaffold, true);
    }

    if (fs.existsSync(testTemplate)) {
      generateFile(name, testTemplate, scaffold + ".test", true);
    }
  }
};

module.exports = generateStore;
