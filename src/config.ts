import { QuestionCollection } from 'inquirer';

export type ReduxMiddleware = 'redux-saga' | 'redux-observable';

export const supportedReduxMiddlewares: Record<string, ReduxMiddleware> = {
  reduxObservable: 'redux-observable',
  reduxSaga: 'redux-saga',
};

export type PackageManager = 'npm' | 'yarn';

export type CI = 'bitbucket' | 'circle' | 'gitlab' | 'none';

export type Answers = {
  includeCypress: boolean;
  packageManager: PackageManager;
  ci: CI;
  middleware: ReduxMiddleware;
};

export const questions: QuestionCollection<Answers> = [
  {
    type: 'confirm',
    name: 'includeCypress',
    message: `Should Cypress configuration be included?`,
  },
  {
    type: 'list',
    name: 'packageManager',
    message: 'Which package manager should be used to install dependencies?',
    choices: ['npm', 'yarn'],
  },
  {
    type: 'list',
    name: 'ci',
    message: 'Which CI configuration should be added?',
    choices: ['bitbucket', 'circle', 'gitlab', 'none'],
  },
  {
    type: 'list',
    name: 'middleware',
    message: 'Which Redux middleware should be in use?',
    choices: Object.values(supportedReduxMiddlewares),
  },
];

export const projectFilesToOverride = {
  rootEpic: 'src/app/store/rootEpic.ts',
  rootSaga: 'src/app/store/rootSaga.ts',
  storeConfig: 'src/app/store/index.ts',
  sagas: 'store/saga',
  epics: 'store/epics',
};

export const projectTemplateRepositoryUrl =
  'https://github.com/espeo/espeo-create-react-app.git';

export const storeScaffolds = ['actions', 'reducers', 'selectors'];

export const ciConfigPathPerCi: Record<Exclude<CI, 'none'>, string> = {
  gitlab: '.gitlab-ci.yml',
  circle: '.circleci/config.yml',
  bitbucket: 'bitbucket-pipelines.yml',
};
