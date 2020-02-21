import { Command } from 'core';
import { exec } from 'helpers';

export const withOutdatedCheck = <T>(command: Command<T>) => async (
  options: T,
): Promise<void> => {
  try {
    const currentVersion = await exec('espeo -v');
    const latestVersion = await exec(
      'npm show @espeo/create-espeo-app-cli version',
    );

    if (currentVersion !== latestVersion)
      console.warn(
        `New version of package available! Current: ${currentVersion}, latest: ${latestVersion}`,
      );

    return command(options);
  } catch (e) {
    console.error(e);
  }
};
