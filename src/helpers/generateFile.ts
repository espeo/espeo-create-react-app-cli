import fs from 'fs';
import path from 'path';
import { handlebars } from 'consolidate';
import mkdirp from 'mkdirp';

const { render } = handlebars;

const generateFileConfig = {
  testFolderName: 'spec',
  storeFolderName: 'store',
};

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
  shouldMoveToStoreFolder?: boolean;
};

export const generateFile = async ({
  targetName,
  targetPath,
  templateSrc,
  type,
  shouldMoveToStoreFolder,
}: GenerateFileProps): Promise<void> => {
  if (!fs.existsSync(templateSrc)) {
    return;
  }

  try {
    const targetDir = `${process.cwd()}${targetPath.replace('.', '')}`;

    let fileName = type === 'index' ? type : `${targetName}.${type}`;
    if (fileName.includes('functional') || fileName.includes('class')) {
      fileName = fileName.replace(/.functional/, '').replace(/.class/, '');
    }

    let desiredDir;
    if (shouldMoveToStoreFolder) {
      desiredDir = `${targetDir}/${generateFileConfig.storeFolderName}/${type}`;
    } else {
      desiredDir = `${targetDir}/${targetName}`;
      if (type.includes('test')) {
        desiredDir = `${targetDir}/${targetName}/${generateFileConfig.testFolderName}`;
      }
    }

    const file = fs.readFileSync(templateSrc);
    const fileExt = getFileExtension(templateSrc);
    const res = await render(file.toString(), { name: targetName });

    makeDir(desiredDir);
    fs.writeFileSync(`${desiredDir}/${fileName}.${fileExt}`, res);

    console.log(
      `Successfully generated ${desiredDir}/${fileName}.${fileExt} file`,
    );
  } catch (error) {
    console.error(error);
  }
};
