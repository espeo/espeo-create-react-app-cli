import {
  CI,
  ReduxMiddleware,
  projectFilesToOverride,
  PackageManager,
  ciConfigPathPerCi,
} from 'config';

const lockFilePerPackageManager: Record<PackageManager, string> = {
  npm: 'package-lock.json',
  yarn: 'yarn.lock',
};

const filterCypressFiles = (includeCy: boolean, assetPath: string): boolean =>
  includeCy ? true : !assetPath.includes('cypress');

const filterCiFiles = (ci: CI, assetPath: string): boolean => {
  const ciConfigFilesToRemove = Object.entries(ciConfigPathPerCi)
    .filter(([key]) => key !== ci)
    .map(([_, files]) => files);

  return !ciConfigFilesToRemove.some(file => assetPath.includes(file));
};

const filterMiddlewareFiles = (
  middleware: ReduxMiddleware,
  assetPath: string,
): boolean =>
  !assetPath.includes(
    middleware === 'redux-saga'
      ? projectFilesToOverride.rootEpic
      : projectFilesToOverride.rootSaga,
  );

const filterLockFiles = (
  packageManager: PackageManager,
  assetPath: string,
): boolean =>
  !assetPath.includes(
    lockFilePerPackageManager[packageManager === 'npm' ? 'yarn' : 'npm'],
  );

export const filterProjectAssets = (
  ci: CI,
  includeCypress: boolean,
  middleware: ReduxMiddleware,
  packageManager: PackageManager,
) => (assetPath: string): boolean =>
  filterCypressFiles(includeCypress, assetPath) &&
  filterCiFiles(ci, assetPath) &&
  filterMiddlewareFiles(middleware, assetPath) &&
  filterLockFiles(packageManager, assetPath);
