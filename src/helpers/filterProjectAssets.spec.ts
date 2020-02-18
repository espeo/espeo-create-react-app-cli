import { filterProjectAssets } from 'helpers';

const filesPaths = [
  '/cypress/fixtures/example.json',
  '/cypress/integration/main.spec.js',
  '.gitlab-ci.yml',
  '.circleci',
  'bitbucket-pipelines.yml',
  'otherFile.js',
];

it('should remove cypress files', () => {
  const outputFiles = filesPaths.filter(
    filterProjectAssets('bitbucket', false),
  );

  expect(outputFiles).toEqual(['bitbucket-pipelines.yml', 'otherFile.js']);
});

it('should include cypress files', () => {
  const outputFiles = filesPaths.filter(filterProjectAssets('bitbucket', true));

  expect(outputFiles).toEqual([
    '/cypress/fixtures/example.json',
    '/cypress/integration/main.spec.js',
    'bitbucket-pipelines.yml',
    'otherFile.js',
  ]);
});

it('should remove all CI files', () => {
  const outputFiles = filesPaths.filter(filterProjectAssets('none', false));

  expect(outputFiles).toEqual(['otherFile.js']);
});

it('should remove all but gitlab CI files', () => {
  const outputFiles = filesPaths.filter(filterProjectAssets('gitlab', false));

  expect(outputFiles).toEqual(['.gitlab-ci.yml', 'otherFile.js']);
});
