import fs from 'fs-extra';
import { ReduxMiddleware } from 'config';
import {
  removeDependency,
  removeDevDependency,
  removeScript,
  compose,
  Identity,
  getOutputDirectory,
} from 'helpers';
import path from 'path';

export type UpdatePackageJson = (
  includeCypress: boolean,
  middleware: ReduxMiddleware,
  projectName: string,
) => void;

export const updatePackageJson: UpdatePackageJson = (
  includeCypress,
  middleware,
  projectName,
) => {
  console.info('Updating package.json...');

  const packageJsonDir = path.join(
    getOutputDirectory(projectName),
    'package.json',
  );
  const packageJson = JSON.parse(fs.readFileSync(packageJsonDir).toString());

  const removeCypress = compose(
    removeDevDependency('cypress'),
    ...['cy:ci', 'cy:open', 'cy:run'].map(removeScript),
  );

  const updatedPackageJson = compose(
    removeDependency(
      middleware === 'redux-saga' ? 'redux-observable' : 'redux-saga',
    ),
    !includeCypress ? removeCypress : Identity,
  )(packageJson);

  fs.writeFileSync(packageJsonDir, JSON.stringify(updatedPackageJson, null, 2));

  console.info('package.json updated!');
};
