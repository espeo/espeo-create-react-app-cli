const fs = require('fs');
const path = require('path');
const render = require('consolidate').handlebars.render;
const mkdirp = require('mkdirp');

const generateFileConfig = {
  testFolderName: 'spec',
  storeFolderName: 'store',
};

const makeDir = dir => {
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

const getFileExtension = filePath => {
  const ext = path.extname(filePath || '').split('.');
  return ext[ext.length - 1];
};

const generateFile = async params => {
  const {
    targetName,
    targetPath,
    templateSrc,
    type,
    shouldMoveToStoreFolder,
  } = params;

  if (typeof targetName === 'undefined' || typeof templateSrc === 'undefined')
    return;

  if (!fs.existsSync(templateSrc)) {
    return;
  }

  const file = fs.readFileSync(templateSrc);
  const fileExt = getFileExtension(templateSrc);
  let targetDir = `${process.cwd()}${targetPath.replace('.', '')}`;
  const renderFile = () => render(file.toString(), { name: targetName });

  const res = await renderFile().catch(err => {
    throw err;
  });

  try {
    let fileName = type === 'index' ? type : `${targetName}.${type}`;
    if (fileName.includes('functional') || fileName.includes('class')) {
      fileName = fileName.replace(/.functional/, '').replace(/.class/, '');
    }

    let desiredDir;
    if (shouldMoveToStoreFolder) {
      desiredDir = `${targetDir}/${generateFileConfig.storeFolderName}/${type}`;
    } else {
      desiredDir = `${targetDir}/${targetName}`;
      if (type.includes('test')) {
        desiredDir = `${targetDir}/${targetName}/${generateFileConfig.testFolderName}`;
      }
    }

    makeDir(desiredDir);
    fs.writeFileSync(`${desiredDir}/${fileName}.${fileExt}`, res);

    console.log(
      `Successfully generated ${desiredDir}/${fileName}.${fileExt} file`,
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = generateFile;
