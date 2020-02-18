import { CI, ReduxMiddleware, projectFilesToOverride } from 'config';

const ciConfigPathPerSupportedCi: Record<Exclude<CI, 'none'>, string> = {
  gitlab: '.gitlab-ci.yml',
  circle: '.circleci',
  bitbucket: 'bitbucket-pipelines.yml',
};

const filterCypressFiles = (includeCy: boolean, assetPath: string): boolean =>
  includeCy ? true : !assetPath.includes('cypress');

const filterCiFiles = (ci: CI, assetPath: string): boolean => {
  const ciConfigFilesToRemove = Object.entries(ciConfigPathPerSupportedCi)
    .filter(([key]) => key !== ci)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, files]) => files);

  return !ciConfigFilesToRemove.some(file => assetPath.includes(file));
};

const filterMiddlewareFiles = (
  middleware: ReduxMiddleware,
  assetPath: string,
): boolean =>
  !assetPath.includes(
    middleware === 'reduxSaga'
      ? projectFilesToOverride.rootEpic
      : projectFilesToOverride.rootSaga,
  );

export const filterProjectAssets = (
  ci: CI,
  includeCy: boolean,
  middleware: ReduxMiddleware,
) => (assetPath: string): boolean =>
  filterCypressFiles(includeCy, assetPath) &&
  filterCiFiles(ci, assetPath) &&
  filterMiddlewareFiles(middleware, assetPath);
