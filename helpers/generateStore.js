const generateFile = require('./generateFile');
const updateRootStore = require('./updateRootStore');
const filesManager = require('../helpers/filesManager');
const manageProjectConfig = require('../helpers/manageProjectConfig');
const config = require('../config');

const generateStore = (targetName, targetPath) => {
  const storeScaffolds = ['actions', 'reducers', 'selectors'];
  const projectConfig = manageProjectConfig.getConfig();
  if (projectConfig && projectConfig.selectedMiddleware === config.supportedMiddlewares.reduxObservable) {
    storeScaffolds.push('epics');
  } else {
    storeScaffolds.push('saga');
  }

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
