const fs = require('fs-extra');
const path = require('path');
const shellExec = require('child_process').exec;
const program = require('commander');
const Spinner = require('cli-spinner').Spinner;
const inquirer = require('inquirer');
const questions = require('../bin/questions');
const exec = require('await-exec');

const spinnerInstance = new Spinner('Installing dependencies... %s');
spinnerInstance.setSpinnerString('|/-\\');

const paths = {
  outputPath: path.join(process.cwd(), program.args[0]),
  templates: path.join(__dirname, '../templates'),
};

const copyAssetsContent = async includeCypress => {
  const templates = path.join(__dirname, '../packageTemplate');

  try {
    console.log('Updating CEA template...');
    await exec(
      `cd  ${
        __dirname
      } && cd .. && git submodule update --init --recursive`,
      (err, stdout) => {
        console.log(stdout);

        console.log('CEA template update finished!');
      },
    );
    console.log('Copying CEA files...');

    await fs.copy(templates, paths.outputPath, {
      filter: path => (includeCypress ? true : !path.includes('cypress')),
    });

    if (!includeCypress) {
      await removeCypressFromPackage();
    }

    console.log('Copying finished!');
  } catch (err) {
    console.error(err);
  }
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

const init = async (includeCypress, packageManager) => {
  await copyAssetsContent(includeCypress);
  spinnerInstance.start();
  await shellExec(
    `cd ${program.args[0]} && ${packageManager.toLowerCase()} install`,
    (err, stdout) => {
      console.log(stdout);

      console.log('Setup finished!');
    },
  );
  spinnerInstance.stop();
};

inquirer.prompt(questions).then(async answers => {
  const { includeCypress, packageManager } = answers;
  init(includeCypress, packageManager);
});
