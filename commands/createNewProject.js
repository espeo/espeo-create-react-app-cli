const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const Spinner = require('cli-spinner').Spinner;
const inquirer = require('inquirer');
const questions = require('../bin/questions');
const exec = require('await-exec');
const render = require('consolidate').handlebars.render;

const spinnerInstance = new Spinner('Installing dependencies... %s');
spinnerInstance.setSpinnerString('|/-\\');

const paths = {
  outputPath: path.join(process.cwd(), program.args[0]),
  templates: path.join(__dirname, '../templates'),
};

const copyAssetsContent = async (includeCypress, middleware) => {
  const templates = path.join(__dirname, '../packageTemplate');

  try {
    console.log('Copying CEA files...');

    await fs.copy(templates, paths.outputPath, {
      filter: path => (includeCypress ? true : !path.includes('cypress')),
    });

    if (!includeCypress) {
      await removeCypressFromPackage();
      console.log('Cypress dependencies removed!');
    }

    await setMiddleware(middleware);
    console.log('Middleware files ready!');
    console.log('Copying finished!');
  } catch (err) {
    console.error(err);
  }
};

const setMiddleware = async middleware => {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(paths.outputPath, 'package.json')),
    );

    let middleWareDeps = {
      package: middleware === 'Redux Saga' ? 'redux-observable' : 'redux-saga',
      file: middleware === 'Redux Saga' ? 'rootEpic.ts' : 'rootSaga.ts',
    };

    delete packageJson.dependencies[middleWareDeps.package];

    await exec(
      `
        rm '${path.join(
          paths.outputPath,
          'src',
          'app',
          'store',
          middleWareDeps.file,
        )}'
      `,
      (err, stdout) => {
        console.log(stdout);
      },
    );

    const storeIndex = path.join(
      paths.outputPath,
      'src',
      'app',
      'store',
      'index.ts',
    );

    const file = fs.readFileSync(storeIndex);

    const res = await render(file.toString(), { middleware });
    fs.writeFileSync(storeIndex, res);

    fs.writeFileSync(
      path.join(paths.outputPath, 'package.json'),
      JSON.stringify(packageJson, null, 2),
    );
  } catch (err) {
    console.log('Could not set middleware!', err);
  }

  return;
};

const removeCypressFromPackage = async () => {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(paths.outputPath, 'package.json')),
    );

    const scripts = ['cy:ci', 'cy:open', 'cy:run'];

    for (const script of scripts) {
      delete packageJson.scripts[script];
    }

    delete packageJson.devDependencies['cypress'];

    fs.writeFileSync(
      path.join(paths.outputPath, 'package.json'),
      JSON.stringify(packageJson, null, 2),
    );
  } catch (err) {
    console.log(
      'Could not read package.json in project folder! Check if file exists',
    );
    return;
  }
};

const init = async (includeCypress, packageManager, middleware) => {
  await copyAssetsContent(includeCypress, middleware);
  spinnerInstance.start();
  await exec(
    `cd ${program.args[0]} && ${packageManager.toLowerCase()} install`,
    (err, stdout) => {
      console.log(stdout);

      console.log('Setup finished!');
    },
  );
  spinnerInstance.stop();
};

inquirer.prompt(questions).then(async answers => {
  const { includeCypress, packageManager, middleware } = answers;
  init(includeCypress, packageManager, middleware);
});
