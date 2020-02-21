import { questions } from 'config';
import { Command } from 'core';
import {
  copyAssets,
  updatePackageJson,
  updateCiFiles,
  updateStoreConfig,
  installDependencies,
} from 'services';
import { withOutdatedCheck } from 'decorators';
import { compose } from 'helpers';
import inquirer from 'inquirer';

type CreateNewProjectCommandOptions = { projectName: string };

const execute: Command<CreateNewProjectCommandOptions> = async ({
  projectName,
}) => {
  try {
    const {
      includeCypress,
      packageManager,
      middleware,
      ci,
    } = await inquirer.prompt(questions);

    await copyAssets(includeCypress, middleware, ci, packageManager);
    updatePackageJson(includeCypress, middleware);
    await updateStoreConfig(middleware);
    updateCiFiles(includeCypress, ci);
    await installDependencies(packageManager, projectName);
  } catch (e) {
    console.error(e);
  }
};

export const createNewProject = compose<
  Command<CreateNewProjectCommandOptions>
>(withOutdatedCheck)(execute);
