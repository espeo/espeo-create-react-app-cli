const path = require('path');
const find = require('find');

const config = require('../config');
const maxDirectoryDepth = 10;

let dirDepth = 0;
const findFile = (fileName, root) => {
  let files = find.fileSync(fileName, root || process.cwd());
  if (dirDepth < maxDirectoryDepth && files.length === 0) {
    dirDepth++;
    return findFile(fileName, '../'.repeat(dirDepth));
  }
  dirDepth = 0;
  return files[0];
}

module.exports = {
  getTemplateFile: templateSrc => path.join(__dirname, '..', config.templatesFolder, templateSrc),
  getOutputFile: outputSrc => path.join(process.cwd(), outputSrc),
  findFile
}