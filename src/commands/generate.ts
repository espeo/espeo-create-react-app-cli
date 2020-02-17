import path from 'path';
import { generateFile, generateStore, getTemplateFile } from 'helpers';
import { UnexpectedCommandArgumentError } from 'errors';
import { Command } from 'core';

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

  if (type === 'store') {
    generateStore(targetName, targetPath);
    return;
  }

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
