import path from 'path';
import { UnexpectedCommandArgumentError } from 'errors';
import { Command } from 'core';
import { generateComponent, generateStore } from 'services';
import { withOutdatedCheck } from 'decorators';
import { compose } from 'helpers';

export type GenerateCommandOptionType = 'store' | 'component';

type GenerateCommandOptions = {
  name: string;
  type: GenerateCommandOptionType;
  functional: boolean;
};

const execute: Command<GenerateCommandOptions> = async ({
  name,
  type,
  functional,
}) => {
  if (type !== 'store' && type !== 'component')
    throw new UnexpectedCommandArgumentError('type');

  const targetName = path.basename(name);
  const targetPath = path.dirname(name);

  if (type === 'store') return generateStore(targetName, targetPath);

  return generateComponent(type, functional, targetName, targetPath);
};

export const generate = compose<Command<GenerateCommandOptions>>(
  withOutdatedCheck,
)(execute);
