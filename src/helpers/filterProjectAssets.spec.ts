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
    filterProjectAssets('bitbucket', false, 'reduxSaga' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual([
    'src/app/store/rootSaga.ts',
    'bitbucket-pipelines.yml',
    'otherFile.js',
  ]);
});

it('should include cypress files', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('bitbucket', true, 'reduxSaga' as ReduxMiddleware),
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
    filterProjectAssets('none', false, 'reduxSaga' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual(['src/app/store/rootSaga.ts', 'otherFile.js']);
});

it('should remove all but gitlab CI files', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('gitlab', false, 'reduxSaga' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual([
    'src/app/store/rootSaga.ts',
    '.gitlab-ci.yml',
    'otherFile.js',
  ]);
});

it('should remove rootSaga', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('none', false, 'reduxObservable' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual(['src/app/store/rootEpic.ts', 'otherFile.js']);
});

it('should remove rootEpic', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('none', false, 'reduxSaga' as ReduxMiddleware),
  );

  expect(outputFiles).toEqual(['src/app/store/rootSaga.ts', 'otherFile.js']);
});
