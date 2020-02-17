const path = require('path');
const program = require('commander');
const generateFile = require('../helpers/generateFile');
const generateStore = require('../helpers/generateStore');
const filesManager = require('../helpers/filesManager');

const name = program.args[1];
const targetName = path.basename(name);
const targetPath = path.dirname(name);
let type = program.args[0];

const shouldBeFunctionalComponent = program.commands[0].functional;

if (type === 'store') {
  generateStore(targetName, targetPath);
} else {
  generateFile({
    targetName,
    targetPath,
    templateSrc: filesManager.getTemplateFile(`${type}.test.tsx`),
    type: 'test',
  });

  if (type === 'component' && shouldBeFunctionalComponent) {
    type += '.functional';
  } else if (type === 'component') {
    type += '.class';
  }

  generateFile({
    targetName,
    targetPath,
    templateSrc: filesManager.getTemplateFile(`${type}.tsx`),
    type,
  });
}
