import { Answers } from 'config';
import { Command } from 'core';
import {
  copyAssets,
  updatePackageJson,
  updateCiFiles,
  updateStoreConfig,
  installDependencies,
} from 'services';

export const createNewProject: Command<Answers> = async ({
  includeCypress,
  packageManager,
  middleware,
  ci,
}) => {
  try {
    await copyAssets(includeCypress, middleware, ci, packageManager);
    updatePackageJson(includeCypress, middleware);
    await updateStoreConfig(middleware);
    updateCiFiles(includeCypress, ci);
    await installDependencies(packageManager);
  } catch (e) {
    console.error(e);
  }
};
