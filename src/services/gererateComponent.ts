import { generateFile, getTemplatesDirectory } from 'helpers';
import path from 'path';

type GenerateComponentInput = {
  functional: boolean;
  targetName: string;
  targetPath: string;
};

export type GenerateComponent = (
  input: GenerateComponentInput,
) => Promise<void>;

export const generateComponent: GenerateComponent = async ({
  functional,
  targetName,
  targetPath,
}): Promise<void> => {
  const baseType = 'component';
  const componentType = `${baseType}.${functional ? 'functional' : 'class'}`;

  await Promise.all([
    generateFile({
      targetName,
      targetPath,
      templateSrc: path.join(getTemplatesDirectory(), `${baseType}.test.tsx`),
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
