import {
  removeDependency,
  removeDevDependency,
  removeScript,
} from 'helpers/packageJson';

const packageJson = {
  name: '@espeo/create-espeo-app-cli',
  version: '0.2.0',
  dependencies: {
    commander: '^4.0.1',
    'cli-spinner': '0.2.10',
  },
  scripts: {
    prepare: 'npm run build',
    precommit: 'lint-staged',
  },
  devDependencies: {
    '@types/commander': '2.12.2',
    '@types/cli-spinner': '0.2.0',
    eslint: '6.8.0',
  },
};

it('should remove dev dependency', () => {
  expect(removeDevDependency('eslint')(packageJson)).toEqual({
    ...packageJson,
    dependencies: {
      commander: '^4.0.1',
      'cli-spinner': '0.2.10',
    },
    devDependencies: {
      '@types/commander': '2.12.2',
      '@types/cli-spinner': '0.2.0',
    },
  });
});

it('should remove dependency with types', () => {
  expect(removeDependency('commander')(packageJson)).toEqual({
    ...packageJson,
    dependencies: {
      'cli-spinner': '0.2.10',
    },
    devDependencies: {
      '@types/cli-spinner': '0.2.0',
      eslint: '6.8.0',
    },
  });
});

it('should remove script', () => {
  expect(removeScript('prepare')(packageJson)).toEqual({
    ...packageJson,
    scripts: {
      precommit: 'lint-staged',
    },
  });
});
