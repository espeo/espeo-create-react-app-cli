const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const Spinner = require('cli-spinner').Spinner;
const inquirer = require('inquirer');
const exec = require('await-exec');
const render = require('consolidate').handlebars.render;

const config = require('../config');
const filesManager = require('../helpers/filesManager');
const manageProjectConfig = require('../helpers/manageProjectConfig');
const prettify = require('../helpers/prettify');

const spinnerInstance = new Spinner('Installing dependencies... %s');
spinnerInstance.setSpinnerString('|/-\\');

const outputPath = program.args[0]
const packageSrc = `${outputPath}/package.json`;

const copyAssetsContent = async (includeCypress, middleware) => {
  const projectTemplate = path.join(__dirname, '..', config.projectTemplateDir);

  try {
    console.info('Copying CEA files...');

    await fs.copy(projectTemplate, filesManager.getOutputFile(`/${outputPath}`), {
      filter: path => (includeCypress ? true : !path.includes('cypress')),
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

const setMiddleware = async middleware => {
  try {
    const packagePath = filesManager.getOutputFile(`${outputPath}/package.json`);
    const packageJson = JSON.parse(
      fs.readFileSync(packagePath),
    );

    const middlewareToRemove = {
      package: middleware === config.supportedMiddlewares.reduxSaga ? 'redux-observable' : 'redux-saga',
      files: middleware === config.supportedMiddlewares.reduxSaga ? 
        [
          config.projectFilesToOverride.rootEpic,
          config.projectFilesToOverride.articlesEpic
        ] :
        [
          config.projectFilesToOverride.rootSaga,
          config.projectFilesToOverride.articlesSaga
        ],
    };

    delete packageJson.dependencies[middlewareToRemove.package];

    try {
      for (let fileToRemove of middlewareToRemove.files) {
        await exec(
          `
            rm '${filesManager.getOutputFile(`/${outputPath}/${fileToRemove}`)}'
          `,
          (err, stdout) => {
            console.log(stdout);
          },
        );
      }
    } catch({ stderr }) {
      console.error(stderr);
    }

    await fillStoreConfig(middleware)

    fs.writeFileSync(
      packagePath,
      JSON.stringify(packageJson, null, 2),
    );
  } catch (err) {
    console.error('Could not set middleware!', err);
  }

  return;
};

const removeCypressFromPackage = async () => {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(filesManager.getOutputFile(packageSrc)),
    );

    const scripts = ['cy:ci', 'cy:open', 'cy:run'];

    for (const script of scripts) {
      delete packageJson.scripts[script];
    }

    delete packageJson.devDependencies['cypress'];

    fs.writeFileSync(
      filesManager.getOutputFile(packageSrc),
      JSON.stringify(packageJson, null, 2),
    );
  } catch (err) {
    console.error(
      'Could not read package.json in project folder! Check if file exists',
    );
    return;
  }
};

const fillStoreConfig = async middleware => {
  const storeConfigSrc = filesManager.getOutputFile(`/${outputPath}/${config.projectFilesToOverride.storeConfig}`);
  const storeConfigTemplateFile = fs.readFileSync(filesManager.getTemplateFile('/store/storeConfig.ts'));
  if (!storeConfigTemplateFile) {
    console.error('Could not find store config template!');
    return;
  }
  
  try {
    const res = prettify(
      await render(storeConfigTemplateFile.toString(), {
        middleware,
        supportedMiddlewares: config.supportedMiddlewares
      })
    );
    fs.writeFileSync(storeConfigSrc, res);
    console.info('Successfuly updated store config file: ' + storeConfigSrc);
  } catch(e) {
    console.error(e);
  } finally {
    return;
  }
}

const init = async (includeCypress, packageManager, middleware) => {
  await copyAssetsContent(includeCypress, middleware);

  await manageProjectConfig.generateConfig({
    selectedMiddleware: middleware
  }, outputPath);

  try {
    await exec(
      `cd ./${program.args[0]} && git init`,
      (err, stdout) => {
        console.log(stdout);
      },
    );
  
    spinnerInstance.start();
    await exec(
      `cd ${program.args[0]} && ${packageManager.toLowerCase()} install`,
      (err, stdout) => {
        console.log(err);
        console.log(stdout);
      },
    );
    spinnerInstance.stop();
    console.log('');
    console.info('Setup finished!');
  
    await exec(
      `cd ./${program.args[0]} && git add --ignore-errors .`,
      (err, stdout) => {
        console.log(err);
        console.log(stdout);
      },
    );
  } catch({ stdout, stderr }) {
    stdout && stdout !== '' && console.error(stdout);
    stderr && stderr !== '' && console.error(stderr);
  }
  
  try {
    await exec(
      `cd ./${program.args[0]} && git commit -m "Initial commit from Create Espeo React App CLI"`,
      (err, stdout) => {
        console.log(err);
        console.log(stdout);
      },
    );
  } catch({ stdout, stderr }) {
    stdout && stdout !== '' && console.error(stdout);
    stderr && stderr !== '' && console.error(stderr);
  }

  console.info('Latest changes committed!');

};

inquirer.prompt(config.questions).then(async answers => {
  const { includeCypress, packageManager, middleware } = answers;
  init(includeCypress, packageManager, middleware);
});
