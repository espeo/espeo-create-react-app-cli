import { Command } from 'core';
import { withOutdatedCheck } from 'decorators';
import { compose, exec } from 'helpers';
import inquirer from 'inquirer';
import {
  supportedReduxMiddlewares,
  PackageManager,
  CI,
  ReduxMiddleware,
} from 'config';
import {
  CopyAssets,
  UpdatePackageJson,
  UpdateCiFiles,
  UpdateStoreConfig,
  InstallDependencies,
  CloneProjectTemplate,
} from 'services';

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

type CreateNewProjectCommand = Command<{ projectName: string }>;

type CreateNewProjectCommandInput = {
  copyAssets: CopyAssets;
  updatePackageJson: UpdatePackageJson;
  updateCiFiles: UpdateCiFiles;
  updateStoreConfig: UpdateStoreConfig;
  installDependencies: InstallDependencies;
  cloneProjectTemplate: CloneProjectTemplate;
};

const createNewProject = ({
  cloneProjectTemplate,
  copyAssets,
  installDependencies,
  updateCiFiles,
  updatePackageJson,
  updateStoreConfig,
}: CreateNewProjectCommandInput): CreateNewProjectCommand => async ({
  projectName,
}): Promise<void> => {
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

export const createNewProjectCommandFactory = compose(
  withOutdatedCheck(exec),
  createNewProject,
);
