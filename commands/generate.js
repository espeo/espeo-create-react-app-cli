const path = require('path');
const fs = require('fs');
const program = require('commander');

const generateFile = require('../helpers/generateFile');
const generateStore = require('../helpers/generateStore');

const name = program.args[1];
let type = program.args[0];

const testPath = path.join(__dirname, `../templates/${type}.test.ts`);
const shouldBeFunctionalComponent = program.commands[0].functional;

if (type === 'store') {
  generateStore(name);
} else {
  if (fs.existsSync(testPath)) {
    generateFile(name, testPath, 'test');
  }

  if (type === 'component' && shouldBeFunctionalComponent) {
    type += '.functional';
  } else if (type === 'component') {
    type += '.class';
  }

  const scaffold = path.join(__dirname, `../templates/${type}.ts`);

  if (scaffold && name) {
    generateFile(name, scaffold, type);
  }
}
