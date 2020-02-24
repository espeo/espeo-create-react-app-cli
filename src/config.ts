export type ReduxMiddleware = 'redux-saga' | 'redux-observable';

export const supportedReduxMiddlewares: Record<string, ReduxMiddleware> = {
  reduxObservable: 'redux-observable',
  reduxSaga: 'redux-saga',
};

export type PackageManager = 'npm' | 'yarn';

export type CI = 'bitbucket' | 'circle' | 'gitlab' | 'none';

export const projectFilesToOverride = {
  rootEpic: 'src/app/store/rootEpic.ts',
  rootSaga: 'src/app/store/rootSaga.ts',
  storeConfig: 'src/app/store/index.ts',
};

export const projectTemplateRepositoryUrl =
  'https://github.com/espeo/espeo-create-react-app.git';

export const storeScaffolds = ['actions', 'reducers', 'selectors'];

export const ciConfigPathPerCi: Record<Exclude<CI, 'none'>, string> = {
  gitlab: '.gitlab-ci.yml',
  circle: '.circleci/config.yml',
  bitbucket: 'bitbucket-pipelines.yml',
};
