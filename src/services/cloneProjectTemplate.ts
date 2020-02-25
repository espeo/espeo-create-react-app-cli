import { exec, getTemplatesDirectory } from 'helpers';
import { projectTemplateRepositoryUrl } from 'config';
import path from 'path';
import fs from 'fs';
import { Spinner } from 'cli-spinner';
import fetch from 'node-fetch';

const getRawFileUrl = (repositoryUrl: string, fileName: string): string =>
  repositoryUrl
    .replace('github.com', 'raw.githubusercontent.com')
    .replace(/.git$/, `/master/${fileName}`);

const getRemotePackageVersion = async (): Promise<string> => {
  const response = await fetch(
    getRawFileUrl(projectTemplateRepositoryUrl, 'package.json'),
  );

  const { version } = await response.json();

  return version;
};

const getLocalPackageVersion = (projectTemplateSrc: string): string => {
  const { version: currentVersion } = JSON.parse(
    fs.readFileSync(path.join(projectTemplateSrc, 'package.json')).toString(),
  );

  return currentVersion;
};

export type CloneProjectTemplate = () => Promise<void>;

export const cloneProjectTemplate: CloneProjectTemplate = async () => {
  const spinnerInstance = new Spinner('Cloning template repository.... %s');
  spinnerInstance.setSpinnerString('|/-\\');

  try {
    const projectTemplateSrc = path.join(
      getTemplatesDirectory(),
      'packageTemplate',
    );

    const directoryExists = fs.existsSync(projectTemplateSrc);

    if (directoryExists) {
      const localVersion = getLocalPackageVersion(projectTemplateSrc);
      const remoteVersion = await getRemotePackageVersion();

      if (localVersion === remoteVersion) return;

      await exec(`rm -rf ${projectTemplateSrc}`);
    }

    spinnerInstance.start();

    await exec(
      `git clone ${projectTemplateRepositoryUrl} ${projectTemplateSrc}`,
    );
    await exec(`rm -R ${projectTemplateSrc}/.git`);
  } finally {
    spinnerInstance.stop(true);
  }
};
