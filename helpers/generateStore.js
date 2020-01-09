const generateFile = require('./generateFile');
const updateRootStore = require('./updateRootStore');
const filesManager = require('../helpers/filesManager');

const generateStore = (targetName, targetPath) => {
  const storeScaffolds = ['actions', 'reducers', 'selectors'];

  for (const scaffold of storeScaffolds) {
    generateFile({
      targetName,
      targetPath,
      templateSrc: filesManager.getTemplateFile(`store/${scaffold}/${scaffold}.test.ts`),
      type: scaffold + '.test',
      shouldMoveToStoreFolder: true
    });

    generateFile({
      targetName,
      targetPath,
      templateSrc: filesManager.getTemplateFile(`store/${scaffold}/index.ts`),
      type: scaffold,
      shouldMoveToStoreFolder: true
    });
  }

  updateRootStore(targetName);
};

module.exports = generateStore;
