const path = require('path');
const program = require('commander');

const config = require('../config');

module.exports = {
  getTemplateFile: templateSrc => path.join(__dirname, '..', config.templatesFolder, templateSrc),
  getOutputFile: outputSrc => path.join(process.cwd(), program.args[0], outputSrc)
}