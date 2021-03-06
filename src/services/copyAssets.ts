import fs from 'fs-extra';
import path from 'path';
import { CI, ReduxMiddleware, PackageManager } from 'config';
import {
  filterProjectAssets,
  getOutputDirectory,
  getTemplatesDirectory,
} from 'helpers';

export type CopyAssets = (
  includeCypress: boolean,
  middleware: ReduxMiddleware,
  ci: CI,
  packageManager: PackageManager,
  projectName: string,
) => Promise<void>;

export const copyAssets: CopyAssets = async (
  includeCypress,
  middleware,
  ci,
  packageManager,
  projectName: string,
) => {
  console.info('Copying CEA files...');

  const projectTemplate = path.join(getTemplatesDirectory(), 'packageTemplate');

  await fs.copy(projectTemplate, getOutputDirectory(projectName), {
    filter: filterProjectAssets(ci, includeCypress, middleware, packageManager),
  });

  console.info('Copying finished!');
};
