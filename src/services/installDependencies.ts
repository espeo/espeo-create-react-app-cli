import { Spinner } from 'cli-spinner';
import { PackageManager } from 'config';
import { exec } from 'helpers';

export const installDependencies = async (
  packageManager: PackageManager,
  projectName: string,
): Promise<void> => {
  const spinnerInstance = new Spinner('Installing dependencies... %s');
  spinnerInstance.setSpinnerString('|/-\\');

  spinnerInstance.start();

  await exec(`cd ${projectName} && ${packageManager.toLowerCase()} install`);

  spinnerInstance.stop();
};
