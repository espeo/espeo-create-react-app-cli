import path from 'path';
import { generateFile, generateStore, getTemplateFile } from 'helpers';
import { UnexpectedCommandArgumentError } from 'errors';

export type GenerateCommandOptionType = 'store' | 'component';

type GenerateCommandOptions = {
  name: string;
  type: GenerateCommandOptionType;
  shouldBeFunctionalComponent: boolean;
};

export const generate = ({
  name,
  type,
  shouldBeFunctionalComponent,
}: GenerateCommandOptions) => {
  if (type !== 'store' && type !== 'component')
    throw new UnexpectedCommandArgumentError('type');

  const targetName = path.basename(name);
  const targetPath = path.dirname(name);

  if (type === 'store') {
    generateStore(targetName, targetPath);
    return;
  }

  generateFile({
    targetName,
    targetPath,
    templateSrc: getTemplateFile(`${type}.test.tsx`),
    type: 'test',
  });

  const componentType = `${type}.${
    shouldBeFunctionalComponent ? 'functional' : 'class'
  }`;

  generateFile({
    targetName,
    targetPath,
    templateSrc: getTemplateFile(`${type}.tsx`),
    type: componentType,
  });
};
