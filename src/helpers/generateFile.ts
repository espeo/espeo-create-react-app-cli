import fs from 'fs';
import path from 'path';
import { handlebars } from 'consolidate';
import mkdirp from 'mkdirp';
import { storeScaffolds } from 'config';

const makeDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

const getFileExtension = (filePath: string): string => {
  const ext = path.extname(filePath || '').split('.');
  return ext[ext.length - 1];
};

type GenerateFileProps = {
  targetName: string;
  targetPath: string;
  templateSrc: string;
  type: string;
};

const getFileName = (targetName: string, type: string): string => {
  let fileName = type === 'index' ? type : `${targetName}.${type}`;
  if (fileName.includes('functional') || fileName.includes('class')) {
    fileName = fileName.replace(/.functional/, '').replace(/.class/, '');
  }

  return fileName;
};

const getDisiredDirectory = (
  shouldMoveToStoreFolder: boolean | undefined,
  type: string,
  targetDir: string,
  targetName: string,
): string => {
  return shouldMoveToStoreFolder
    ? `${targetDir}/'store'/${type}`
    : type.includes('test')
    ? `${targetDir}/${targetName}/spec`
    : `${targetDir}/${targetName}`;
};

export const generateFile = async ({
  targetName,
  targetPath,
  templateSrc,
  type,
}: GenerateFileProps): Promise<void> => {
  if (!fs.existsSync(templateSrc)) {
    return;
  }

  try {
    const shouldMoveToStoreFolder = storeScaffolds.some(scaffold =>
      type.includes(scaffold),
    );

    const targetDir = `${process.cwd()}${targetPath.replace('.', '')}`;

    const fileName = getFileName(targetName, type);
    const desiredDir = getDisiredDirectory(
      shouldMoveToStoreFolder,
      type,
      targetDir,
      targetName,
    );

    const file = fs.readFileSync(templateSrc);
    const fileExt = getFileExtension(templateSrc);
    const fileContent = await handlebars.render(file.toString(), {
      name: targetName,
    });

    makeDir(desiredDir);
    fs.writeFileSync(`${desiredDir}/${fileName}.${fileExt}`, fileContent);

    console.log(
      `Successfully generated ${desiredDir}/${fileName}.${fileExt} file`,
    );
  } catch (error) {
    console.error(error);
  }
};
