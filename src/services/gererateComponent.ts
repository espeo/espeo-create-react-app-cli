import { generateFile, getTemplateFile } from 'helpers';
import { GenerateCommandOptionType } from 'commands';

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
