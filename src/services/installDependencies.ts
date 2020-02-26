import { Spinner } from 'cli-spinner';
import { PackageManager } from 'config';
import { exec } from 'helpers';

export type InstallDependencies = (
  packageManager: PackageManager,
  projectName: string,
) => Promise<void>;

export const installDependencies: InstallDependencies = async (
  packageManager,
  projectName,
) => {
  const spinnerInstance = new Spinner('Installing dependencies... %s');
  spinnerInstance.setSpinnerString('|/-\\');

  try {
    spinnerInstance.start();

    await exec(`cd ${projectName} && ${packageManager.toLowerCase()} install`);
  } finally {
    spinnerInstance.stop(true);
  }
};
