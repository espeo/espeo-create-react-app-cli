const fs = require('fs');
const render = require('consolidate').handlebars.render;
const mkdirp = require('mkdirp');

const prettify = require('./prettify');

const generateFileConfig = {
  testFolderName: 'spec',
  storeFolderName: 'store'
}

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

const generateFile = async (params) => {
  const {
    targetName,
    targetPath,
    templateSrc,
    type,
    shouldMoveToStoreFolder
  } = params;

  if (
    typeof targetName === 'undefined' ||
    typeof templateSrc === 'undefined'
  ) return;

  if (!fs.existsSync(templateSrc)) {
    return;
  }

  const file = fs.readFileSync(templateSrc);
  let targetDir = `${process.cwd()}${targetPath.replace('.', '')}`;

  const res = prettify(
    await render(file.toString(), { name: targetName })
      .catch(err => {
        throw err;
      })
  )

  try {
    let fileName = type === 'index' ? type : `${targetName}.${type}`;
    if (fileName.includes('functional') || fileName.includes('class')) {
      fileName = fileName
        .replace(/.functional/, '')
        .replace(/.class/, '');
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
    fs.writeFileSync(`${desiredDir}/${fileName}.ts`, res);

    console.log(`Successfully generated ${desiredDir}/${fileName}.ts file`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = generateFile;
