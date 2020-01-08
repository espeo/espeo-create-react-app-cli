const path = require('path');
const fs = require('fs');
const program = require('commander');

const generateFile = require('../helpers/generateFile');
const generateStore = require('../helpers/generateStore');

const name = program.args[1];
const targetName = path.basename(name)
const targetPath = path.dirname(name)
let type = program.args[0];

const shouldBeFunctionalComponent = program.commands[0].functional;

if (type === 'store') {
  generateStore(targetName, targetPath);
} else {
  const testSrc = path.join(__dirname, `../templates/${type}.test.ts`);
  if (fs.existsSync(testSrc)) {
    generateFile({
      targetName,
      targetPath,
      templateSrc: path.join(__dirname, `../templates/${type}.test.ts`),
      type: 'test'
    });
  }

  if (type === 'component' && shouldBeFunctionalComponent) {
    type += '.functional';
  } else if (type === 'component') {
    type += '.class';
  }

  generateFile({
    targetName,
    targetPath,
    templateSrc: path.join(__dirname, `../templates/${type}.ts`),
    type
  });
}
