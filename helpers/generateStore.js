const path = require('path');
const fs = require('fs');
const generateFile = require('./generateFile');
const updateRootStore = require('./updateRootStore');

const generateStore = (targetName, targetPath) => {
  const storeScaffolds = ['actions', 'reducers', 'selectors'];

  for (const scaffold of storeScaffolds) {
    generateFile({
      targetName,
      targetPath,
      templateSrc: path.join(
        __dirname,
        `../templates/store/${scaffold}/${scaffold}.test.ts`,
      ),
      type: scaffold + '.test',
      shouldMoveToStoreFolder: true
    });

    generateFile({
      targetName,
      targetPath,
      templateSrc: path.join(
        __dirname,
        `../templates/store/${scaffold}/index.ts`,
      ),
      type: scaffold,
      shouldMoveToStoreFolder: true
    });
  }

  updateRootStore(targetName);
};

module.exports = generateStore;
