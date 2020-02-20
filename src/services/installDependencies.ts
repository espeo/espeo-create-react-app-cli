import program from 'commander';
import { Spinner } from 'cli-spinner';
import { PackageManager } from 'config';
import { exec } from 'helpers';

export const installDependencies = async (
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
