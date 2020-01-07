const fs = require('fs');
const render = require('consolidate').handlebars.render;
const mkdirp = require('mkdirp');
const updateRootStore = require('./updateRootStore');
const path = require('path');

const generateFileConfig = {
  testFolderName: 'spec'
}

const makeDir = async (dir) => {
  if (!fs.existsSync(dir)) {
    await mkdirp(dir, err => {
      if (err) throw err;
    });
  }
};

const generateFile = (name, src, type, shouldMoveToStoreFolder = false) => {
  const file = fs.readFileSync(src);
  const targetName = path.basename(name)
  const targetPath = path.dirname(name)
  const targetDir = `${process.cwd()}${targetPath}/${targetName}`
  const renderFile = () => render(file.toString(), { name: targetName });

  const init = async () => {
    await makeDir(targetDir);
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
      
      let destinationPath = `${targetDir}/${fileName}.ts`;
      if (type.includes('test')) {
        const specFolderDist = `${targetDir}/${generateFileConfig.testFolderName}`;
        await makeDir(specFolderDist);
        destinationPath = `${specFolderDist}/${fileName}.ts`;
      }
      
      fs.writeFileSync(destinationPath, res);

      if (src.includes('reducer.ts')) {
        updateRootStore(name);
      }

      console.log(`Successfully generated ${targetDir}/${fileName}.ts file`);
    } catch (error) {
      console.error(error);
    }
  };

  init();
};

module.exports = generateFile;
