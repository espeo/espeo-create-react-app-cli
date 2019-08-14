const fs = require('fs');
const render = require('consolidate').handlebars.render;
const mkdirp = require('mkdirp');
const updateRootStore = require('./updateRootStore');

const generateFile = (name, src, type, shouldMoveToStoreFolder = false) => {
  const file = fs.readFileSync(src);
  const renderFile = () => render(file.toString(), { name });
  const folderDir = `${process.cwd()}/${name}`;
  const specFolderDist = `${process.cwd()}/${name}/spec`;

  const createSpecFolder = async () => {
    if (!fs.existsSync(specFolderDist)) {
      await mkdirp(specFolderDist, err => {
        if (err) throw err;
      });
    }
  };

  const init = async () => {
    await createSpecFolder();
    await renderFile()
      .then(res => {
        try {
          let fileName = type === 'index' ? type : `${name}.${type}`;

          if (fileName.includes('functional') || fileName.includes('class')) {
            fileName = fileName
              .replace(/.functional/, '')
              .replace(/.class/, '');
          }
          if (shouldMoveToStoreFolder) {
            createSpecFolder();

            const destinationPath = type.includes('test')
              ? `${specFolderDist}/${fileName}.ts`
              : `${folderDir}/${fileName}.ts`;

            fs.writeFileSync(destinationPath, res);
          } else {
            fs.writeFileSync(`${process.cwd()}/${fileName}.ts`, res);
          }

          if (src.includes('reducer.ts')) {
            updateRootStore(name);
          }

          console.log(`Successfully generated ${fileName}.ts file`);
        } catch (error) {
          console.error(error);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  init();
};

module.exports = generateFile;
