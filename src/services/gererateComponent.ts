import { generateFile, getTemplatesDirectory } from 'helpers';
import { GenerateCommandOptionType } from 'commands';
import path from 'path';

export const generateComponent = async (
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
      templateSrc: path.join(getTemplatesDirectory(), `${type}.test.tsx`),
      type: 'test',
    }),
    generateFile({
      targetName,
      targetPath,
      templateSrc: path.join(getTemplatesDirectory(), `${componentType}.tsx`),
      type: componentType,
    }),
  ]);
};
