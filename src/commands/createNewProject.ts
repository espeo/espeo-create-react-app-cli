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
} from 'config';
import { getOutputFile, getTemplateFile, filterProjectAssets } from 'helpers';
import { Command } from 'core';
import { exec } from 'helpers';

const copyAssetsContent = async (
  includeCypress: boolean,
  middleware: ReduxMiddleware,
  ci: CI,
): Promise<void> => {
  const projectTemplate = path.join(__dirname, '../../packageTemplate');

  try {
    console.info('Copying CEA files...');

    await fs.copy(projectTemplate, getOutputFile(''), {
      filter: filterProjectAssets(ci, includeCypress),
    });

    if (!includeCypress) {
      await removeCypressFromPackage();
      console.info('Cypress dependencies removed!');
    }

    await setMiddleware(middleware);
    console.info('Middleware files ready!');
    console.info('Copying finished!');
  } catch (err) {
    console.error(err);
  }
};

const setMiddleware = async (middleware: ReduxMiddleware): Promise<void> => {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(getOutputFile('package.json')).toString(),
    );

    const middleWareDeps = {
      package:
        middleware === 'reduxObservable' ? 'redux-observable' : 'redux-saga',
      file:
        middleware === 'reduxSaga'
          ? projectFilesToOverride.rootEpic
          : projectFilesToOverride.rootSaga,
    };

    delete packageJson.dependencies[middleWareDeps.package];

    const stdout = await exec(`rm '${getOutputFile(middleWareDeps.file)}'`);
    console.log(stdout);

    await fillStoreConfig(middleware);

    fs.writeFileSync(
      getOutputFile('package.json'),
      JSON.stringify(packageJson, null, 2),
    );
  } catch (err) {
    console.error('Could not set middleware!', err);
  }

  return;
};

const removeCypressFromPackage = async (): Promise<void> => {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(getOutputFile('package.json')).toString(),
    );

    const scripts = ['cy:ci', 'cy:open', 'cy:run'];

    for (const script of scripts) {
      delete packageJson.scripts[script];
    }

    delete packageJson.devDependencies['cypress'];

    fs.writeFileSync(
      getOutputFile('package.json'),
      JSON.stringify(packageJson, null, 2),
    );
  } catch (err) {
    console.error(
      'Could not read package.json in project folder! Check if file exists',
    );
    return;
  }
};

const fillStoreConfig = async (middleware: ReduxMiddleware): Promise<void> => {
  const { render } = handlebars;

  const storeConfigSrc = getOutputFile(projectFilesToOverride.storeConfig);
  const storeConfigTemplateFile = fs.readFileSync(
    getTemplateFile('/store/storeConfig.ts'),
  );
  if (!storeConfigTemplateFile) {
    console.error('Could not find store config template!');
    return;
  }

  try {
    const res = await render(storeConfigTemplateFile.toString(), {
      middleware,
    });
    fs.writeFileSync(storeConfigSrc, res);
    console.info('Successfuly updated store config file: ' + storeConfigSrc);
  } catch (e) {
    console.error(e);
  } finally {
    return;
  }
};

const installDependencies = (packageManager: PackageManager): Promise<string> =>
  exec(`cd ${program.args[0]} && ${packageManager.toLowerCase()} install`);

export const createNewProject: Command<Answers> = async ({
  includeCypress,
  packageManager,
  middleware,
  ci,
}) => {
  const spinnerInstance = new Spinner('Installing dependencies... %s');
  spinnerInstance.setSpinnerString('|/-\\');

  await copyAssetsContent(includeCypress, middleware, ci);

  spinnerInstance.start();

  await installDependencies(packageManager);

  spinnerInstance.stop();
};
