import { generateFile, getTemplateFile, addReducerToStore } from 'helpers';
import findUp from 'find-up';
import fs from 'fs';
import { storeScaffolds } from 'config';

export const generateStore = async (
  targetName: string,
  targetPath: string,
): Promise<void> => {
  await Promise.all(
    storeScaffolds.map(scaffold =>
      Promise.all([
        generateFile({
          targetName,
          targetPath,
          templateSrc: getTemplateFile(`store/${scaffold}/${scaffold}.test.ts`),
          type: scaffold + '.test',
        }),
        generateFile({
          targetName,
          targetPath,
          templateSrc: getTemplateFile(`store/${scaffold}/index.ts`),
          type: scaffold,
        }),
      ]),
    ),
  );

  const rootStoreFilePath = await findUp('store/rootReducer.ts');
  if (!rootStoreFilePath) {
    console.error('Could not find rootReducer file!');
    return;
  }

  const rootStoreContent = fs.readFileSync(rootStoreFilePath, 'utf-8');
  const updatedContent = addReducerToStore(targetName, rootStoreContent);

  fs.writeFileSync(rootStoreFilePath, updatedContent);
};
