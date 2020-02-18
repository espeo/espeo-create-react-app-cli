import path from 'path';
import { generateFile, getTemplateFile, addReducerToStore } from 'helpers';
import { UnexpectedCommandArgumentError } from 'errors';
import { Command } from 'core';
import findUp from 'find-up';
import fs from 'fs';

//TODO: use prettier with config from packageTemplate to format all things we generate

const generateStore = async (
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

  const rootStoreFilePath = await findUp('store/rootReducer.ts');
  if (!rootStoreFilePath) {
    console.error('Could not find rootReducer file!');
    return;
  }

  const rootStoreContent = fs.readFileSync(rootStoreFilePath, 'utf-8');
  const updatedContent = addReducerToStore(targetName, rootStoreContent);

  fs.writeFileSync(rootStoreFilePath, updatedContent);
};

const generateComponent = async (
  type: GenerateCommandOptionType,
  shouldBeFunctionalComponent: boolean,
  targetName: string,
  targetPath: string,
): Promise<void> => {
  const componentType = `${type}.${
    shouldBeFunctionalComponent ? 'functional' : 'class'
  }`;

  await Promise.all([
    generateFile({
      targetName,
      targetPath,
      templateSrc: getTemplateFile(`${type}.test.tsx`),
      type: 'test',
    }),
    generateFile({
      targetName,
      targetPath,
      templateSrc: getTemplateFile(`${componentType}.tsx`),
      type: componentType,
    }),
  ]);
};

export type GenerateCommandOptionType = 'store' | 'component';

type GenerateCommandOptions = {
  name: string;
  type: GenerateCommandOptionType;
  shouldBeFunctionalComponent: boolean;
};

export const generate: Command<GenerateCommandOptions> = async ({
  name,
  type,
  shouldBeFunctionalComponent,
}) => {
  if (type !== 'store' && type !== 'component')
    throw new UnexpectedCommandArgumentError('type');

  const targetName = path.basename(name);
  const targetPath = path.dirname(name);

  if (type === 'store') return generateStore(targetName, targetPath);

  return generateComponent(
    type,
    shouldBeFunctionalComponent,
    targetName,
    targetPath,
  );
};
