import { Command } from 'core';
import { Exec } from 'helpers';
import { name as packageName } from './../../package.json';
import { gt } from 'semver';

export const withOutdatedCheck = (exec: Exec) => <T>(
  command: Command<T>,
) => async (options: T): Promise<void> => {
  const currentVersion = await exec('espeo -v');
  const latestVersion = await exec(`npm show ${packageName} version`);

  if (gt(latestVersion, currentVersion)) {
    console.warn(
      `New version of package available! Current: ${currentVersion}, latest: ${latestVersion}`,
    );
  }

  return command(options);
};
