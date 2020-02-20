import { exec, getTemplatesDirectory } from 'helpers';
import { projectTemplateRepositoryUrl } from 'config';
import path from 'path';
import fs from 'fs';
import { Spinner } from 'cli-spinner';

export const cloneProjectTemplate = async (): Promise<void> => {
  const projectTemplateSrc = path.join(
    getTemplatesDirectory(),
    'projectTemplate',
  );

  if (fs.existsSync(projectTemplateSrc)) return;

  const spinnerInstance = new Spinner('Cloning template repository.... %s');
  spinnerInstance.setSpinnerString('|/-\\');

  spinnerInstance.start();

  await exec(`git clone ${projectTemplateRepositoryUrl} ${projectTemplateSrc}`);
  await exec(`rm -R ${projectTemplateSrc}/.git`);

  spinnerInstance.stop();
};
