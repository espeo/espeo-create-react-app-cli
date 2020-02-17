import { updateRootStore, getTemplateFile, generateFile } from 'helpers';

export const generateStore = (targetName: string, targetPath: string): void => {
  const storeScaffolds = ['actions', 'reducers', 'selectors'];

  for (const scaffold of storeScaffolds) {
    generateFile({
      targetName,
      targetPath,
      templateSrc: getTemplateFile(`store/${scaffold}/${scaffold}.test.ts`),
      type: scaffold + '.test',
      shouldMoveToStoreFolder: true,
    });

    generateFile({
      targetName,
      targetPath,
      templateSrc: getTemplateFile(`store/${scaffold}/index.ts`),
      type: scaffold,
      shouldMoveToStoreFolder: true,
    });
  }

  updateRootStore(targetName);
};

module.exports = generateStore;
