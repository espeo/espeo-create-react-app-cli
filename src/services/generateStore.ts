import {
  generateFile,
  addReducerToStore,
  getTemplatesDirectory,
} from 'helpers';
import findUp from 'find-up';
import fs from 'fs';
import { storeScaffolds } from 'config';
import path from 'path';

type GenerateStoreInput = {
  targetName: string;
  targetPath: string;
};

export type GenerateStore = (input: GenerateStoreInput) => Promise<void>;

export const generateStore: GenerateStore = async ({
  targetName,
  targetPath,
}): Promise<void> => {
  await Promise.all(
    storeScaffolds.map(scaffold =>
      Promise.all([
        generateFile({
          targetName,
          targetPath,
          templateSrc: path.join(
            getTemplatesDirectory(),
            `store/${scaffold}/${scaffold}.test.ts`,
          ),
          type: scaffold + '.test',
        }),
        generateFile({
          targetName,
          targetPath,
          templateSrc: path.join(
            getTemplatesDirectory(),
            `store/${scaffold}/index.ts`,
          ),
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
