const fs = require("fs-extra");
const path = require("path");
const shellExec = require("child_process").exec;
const program = require("commander");
const Spinner = require("cli-spinner").Spinner;

const spinnerInstance = new Spinner("Installing dependencies... %s");
spinnerInstance.setSpinnerString("|/-\\");

const paths = {
  outputPath: path.join(process.cwd(), program.args[0]),
  templates: path.join(__dirname, "../templates")
};

const copyAssetsContent = async () => {
  const templates = path.join(__dirname, "../packageTemplate");

  try {
    console.log("Copying boilerplate files...");
    await fs.copy(templates, paths.outputPath);
    console.log("Copying finished!");
  } catch (err) {
    console.error(err);
  }
};
const init = async () => {
  await copyAssetsContent();
  spinnerInstance.start();
  await shellExec(`cd ${program.args[0]} && yarn`, (err, stdout) => {
    console.log(stdout);

    console.log("Setup finished!");
  });
  spinnerInstance.stop();
};

init();
