import fs from 'fs-extra';
import { handlebars } from 'consolidate';
import {
  projectFilesToOverride,
  ReduxMiddleware,
  supportedReduxMiddlewares,
} from 'config';
import path from 'path';
import { getOutputDirectory, getTemplatesDirectory } from 'helpers';

export type UpdateStoreConfig = (
  middleware: ReduxMiddleware,
  projectName: string,
) => Promise<void>;

export const updateStoreConfig: UpdateStoreConfig = async (
  middleware,
  projectName,
) => {
  console.log('Updating store...');

  const storeConfigSrc = path.join(
    getOutputDirectory(projectName),
    projectFilesToOverride.storeConfig,
  );

  const storeConfigTemplateFile = fs.readFileSync(
    path.join(getTemplatesDirectory(), '/store/storeConfig.ts'),
  );

  if (!storeConfigTemplateFile) {
    console.error('Could not find store config template!');
    return;
  }

  const storeContent = await handlebars.render(
    storeConfigTemplateFile.toString(),
    {
      middleware,
      supportedReduxMiddlewares,
    },
  );

  fs.writeFileSync(storeConfigSrc, storeContent);

  console.info('Store updated');
};
