import { Command } from 'core';
import {
  copyAssets,
  updatePackageJson,
  updateCiFiles,
  updateStoreConfig,
  installDependencies,
  cloneProjectTemplate,
} from 'services';
import { withOutdatedCheck } from 'decorators';
import { compose } from 'helpers';
import inquirer from 'inquirer';
import {
  supportedReduxMiddlewares,
  PackageManager,
  CI,
  ReduxMiddleware,
} from 'config';

type CreateNewProjectCommandOptions = { projectName: string };

export type Answers = {
  includeCypress: boolean;
  packageManager: PackageManager;
  ci: CI;
  middleware: ReduxMiddleware;
};

export const questions: inquirer.QuestionCollection<Answers> = [
  {
    type: 'confirm',
    name: 'includeCypress',
    message: `Should Cypress configuration be included?`,
  },
  {
    type: 'list',
    name: 'packageManager',
    message: 'Which package manager should be used to install dependencies?',
    choices: ['npm', 'yarn'],
  },
  {
    type: 'list',
    name: 'ci',
    message: 'Which CI configuration should be added?',
    choices: ['bitbucket', 'circle', 'gitlab', 'none'],
  },
  {
    type: 'list',
    name: 'middleware',
    message: 'Which Redux middleware should be in use?',
    choices: Object.values(supportedReduxMiddlewares),
  },
];

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

    await cloneProjectTemplate();
    await copyAssets(includeCypress, middleware, ci, packageManager);
    updatePackageJson(includeCypress, middleware);
    await updateStoreConfig(middleware);
    updateCiFiles(includeCypress, ci);
    await installDependencies(packageManager, projectName);
  } catch (e) {
    console.error(e.message);
  }
};

export const createNewProject = compose(withOutdatedCheck)(execute);
