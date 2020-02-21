import fs from 'fs-extra';
import { ReduxMiddleware } from 'config';
import {
  getOutputFile,
  removeDependency,
  removeDevDependency,
  removeScript,
  compose,
  Identity,
} from 'helpers';

export const updatePackageJson = (
  includeCypress: boolean,
  middleware: ReduxMiddleware,
): void => {
  console.info('Updating package.json...');

  const packageJson = JSON.parse(
    fs.readFileSync(getOutputFile('package.json')).toString(),
  );

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

  fs.writeFileSync(
    getOutputFile('package.json'),
    JSON.stringify(updatedPackageJson, null, 2),
  );

  console.info('package.json updated!');
};
