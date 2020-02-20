import path from 'path';
import { UnexpectedCommandArgumentError } from 'errors';
import { Command } from 'core';
import { generateComponent, generateStore } from 'services';

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
