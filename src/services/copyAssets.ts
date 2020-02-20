import fs from 'fs-extra';
import path from 'path';
import { CI, ReduxMiddleware, PackageManager } from 'config';
import { getOutputFile, filterProjectAssets } from 'helpers';

export const copyAssets = async (
  includeCypress: boolean,
  middleware: ReduxMiddleware,
  ci: CI,
  packageManager: PackageManager,
): Promise<void> => {
  console.info('Copying CEA files...');

  const projectTemplate = path.join(__dirname, '../packageTemplate');

  await fs.copy(projectTemplate, getOutputFile(''), {
    filter: filterProjectAssets(ci, includeCypress, middleware, packageManager),
  });

  console.info('Copying finished!');
};
