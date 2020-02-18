import { QuestionCollection } from 'inquirer';

export type ReduxMiddleware = 'redux-saga' | 'redux-observable';

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
    choices: ['redux-saga', 'redux-observable'],
  },
];

export const projectFilesToOverride = {
  rootEpic: 'src/app/store/rootEpic.ts',
  rootSaga: 'src/app/store/rootSaga.ts',
  storeConfig: 'src/app/store/index.ts',
};

export const templatesFolderName = 'templates';
export const storeFolderName = 'store';
export const testsFolderName = 'spec';
export const storeScaffolds = ['actions', 'reducers', 'selectors'];
