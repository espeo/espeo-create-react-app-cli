import path from 'path';
import { UnexpectedArgumentsError } from 'errors';
import { Command } from 'core';
import { GenerateComponent, GenerateStore } from 'services';
import { withOutdatedCheck } from 'decorators';
import { compose, exec, getOutputDirectory } from 'helpers';

export type GenerateCommandOptionType = 'store' | 'component';

type GenerateCommand = Command<{
  name: string;
  type: GenerateCommandOptionType;
  functional?: boolean;
}>;

type GenerateCommandInput = {
  generateComponent: GenerateComponent;
  generateStore: GenerateStore;
};

const generate = ({
  generateComponent,
  generateStore,
}: GenerateCommandInput): GenerateCommand => async ({
  name,
  type,
  functional,
}): Promise<void> => {
  if (type !== 'store' && type !== 'component')
    throw new UnexpectedArgumentsError(['type']);

  const targetName = path.basename(name);
  const targetPath = getOutputDirectory(path.dirname(name));

  if (type === 'store') return generateStore(targetName, targetPath);

  return generateComponent(type, functional === true, targetName, targetPath);
};

export const generateCommandFactory = compose(
  withOutdatedCheck(exec),
  generate,
);
