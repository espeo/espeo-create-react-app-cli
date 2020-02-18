import { filterProjectAssets } from 'helpers';
import { ReduxMiddleware } from 'config';

const filesPaths = [
  '/cypress/fixtures/example.json',
  '/cypress/integration/main.spec.js',
  'src/app/store/rootEpic.ts',
  'src/app/store/rootSaga.ts',
  '.gitlab-ci.yml',
  '.circleci',
  'bitbucket-pipelines.yml',
  'otherFile.js',
];

it('should remove cypress files', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('bitbucket', false, 'redux-saga' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual([
    'src/app/store/rootSaga.ts',
    'bitbucket-pipelines.yml',
    'otherFile.js',
  ]);
});

it('should include cypress files', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('bitbucket', true, 'redux-saga' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual([
    '/cypress/fixtures/example.json',
    '/cypress/integration/main.spec.js',
    'src/app/store/rootSaga.ts',
    'bitbucket-pipelines.yml',
    'otherFile.js',
  ]);
});

it('should remove all CI files', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('none', false, 'redux-saga' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual(['src/app/store/rootSaga.ts', 'otherFile.js']);
});

it('should remove all but gitlab CI files', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('gitlab', false, 'redux-saga' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual([
    'src/app/store/rootSaga.ts',
    '.gitlab-ci.yml',
    'otherFile.js',
  ]);
});
