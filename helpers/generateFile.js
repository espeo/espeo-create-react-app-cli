const fs = require('fs');
const render = require('consolidate').handlebars.render;
const mkdirp = require('mkdirp');
const updateRootStore = require('./updateRootStore');

const generateFileConfig = {
  testFolderName: 'spec'
}

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log('create dir', dir)
    mkdirp.sync(dir);
  }
};

const generateFile = async (targetName, targetPath, templateSrc, type, shouldMoveToStoreFolder = false) => {
  const file = fs.readFileSync(templateSrc);
  let targetDir = `${process.cwd()}${targetPath.replace('.', '')}/${targetName}`
  const renderFile = () => render(file.toString(), { name: targetName });

  const res = await renderFile()
    .catch(err => {
      throw err;
    });

  try {
    let fileName = type === 'index' ? type : `${targetName}.${type}`;

    if (fileName.includes('functional') || fileName.includes('class')) {
      fileName = fileName
        .replace(/.functional/, '')
        .replace(/.class/, '');
    }
    
    if (type.includes('test')) {
      targetDir = `${targetDir}/${generateFileConfig.testFolderName}`;
    }

    makeDir(targetDir);
    fs.writeFileSync(`${targetDir}/${fileName}.ts`, res);

    if (templateSrc.includes('reducer.ts')) {
      updateRootStore(name);
    }

    console.log(`Successfully generated ${targetDir}/${fileName}.ts file`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = generateFile;
