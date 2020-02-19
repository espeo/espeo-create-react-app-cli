import fs from 'fs-extra';
import path from 'path';
import program from 'commander';
import { Spinner } from 'cli-spinner';
import { handlebars } from 'consolidate';
import {
  projectFilesToOverride,
  Answers,
  CI,
  ReduxMiddleware,
  PackageManager,
  supportedReduxMiddlewares,
} from 'config';
import {
  getOutputFile,
  getTemplateFile,
  filterProjectAssets,
  exec,
  removeDependency,
  removeDevDependency,
  removeScript,
  compose,
  PackageJson,
  Identity,
} from 'helpers';
import { Command } from 'core';

const updateStoreConfig = async (
  middleware: ReduxMiddleware,
): Promise<void> => {
  console.log('Updating store...');

  const storeConfigSrc = getOutputFile(projectFilesToOverride.storeConfig);
  const storeConfigTemplateFile = fs.readFileSync(
    getTemplateFile('/store/storeConfig.ts'),
  );

  if (!storeConfigTemplateFile) {
    console.error('Could not find store config template!');
    return;
  }

  const storeContent = await handlebars.render(
    storeConfigTemplateFile.toString(),
    {
      middleware,
      supportedReduxMiddlewares,
    },
  );

  fs.writeFileSync(storeConfigSrc, storeContent);

  console.info('Store updated');
};

const copyAssets = async (
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

const updatePackageJson = (
  includeCypress: boolean,
  middleware: ReduxMiddleware,
): void => {
  console.info('Updating package.json...');

  const packageJson = JSON.parse(
    fs.readFileSync(getOutputFile('package.json')).toString(),
  );

  const removeCypress = compose(
    removeDevDependency('cypress'),
    ...['cy:ci', 'cy:open', 'cy:run'].map(removeScript),
  );

  const updatedPackageJson = compose<PackageJson>(
    removeDependency(
      middleware === 'redux-saga' ? 'redux-observable' : 'redux-saga',
    ),
    !includeCypress ? removeCypress : Identity,
  )(packageJson);

  fs.writeFileSync(
    getOutputFile('package.json'),
    JSON.stringify(updatedPackageJson, null, 2),
  );

  console.info('package.json updated!');
};

const installDependencies = async (
  packageManager: PackageManager,
): Promise<void> => {
  const spinnerInstance = new Spinner('Installing dependencies... %s');
  spinnerInstance.setSpinnerString('|/-\\');

  spinnerInstance.start();

  await exec(
    `cd ${program.args[0]} && ${packageManager.toLowerCase()} install`,
  );

  spinnerInstance.stop();
};

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
    // await installDependencies(packageManager);
  } catch (e) {
    console.log(e);
  }
};
