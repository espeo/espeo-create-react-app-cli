import { updateRootStore, getTemplateFile, generateFile } from 'helpers';

export const generateStore = async (
  targetName: string,
  targetPath: string,
): Promise<void> => {
  const storeScaffolds = ['actions', 'reducers', 'selectors'];

  await Promise.all(
    storeScaffolds.map(scaffold =>
      Promise.all([
        generateFile({
          targetName,
          targetPath,
          templateSrc: getTemplateFile(`store/${scaffold}/${scaffold}.test.ts`),
          type: scaffold + '.test',
          shouldMoveToStoreFolder: true,
        }),
        generateFile({
          targetName,
          targetPath,
          templateSrc: getTemplateFile(`store/${scaffold}/index.ts`),
          type: scaffold,
          shouldMoveToStoreFolder: true,
        }),
      ]),
    ),
  );

  updateRootStore(targetName);
};
