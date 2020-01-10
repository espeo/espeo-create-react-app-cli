const supportedMiddlewares = {
  reduxSaga: 'Redux Saga',
  reduxObservable: 'Redux Observable'
}

const supportedPackageManagers = {
  npm: 'NPM',
  yarn: 'Yarn'
}

module.exports = {
  supportedMiddlewares,
  supportedPackageManagers,
  questions: [
    {
      type: 'confirm',
      name: 'includeCypress',
      message: `Should Cypress configuration be included?`,
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager should be used to install dependencies?',
      choices: Object.values(supportedPackageManagers),
    },
    {
      type: 'list',
      name: 'middleware',
      message: 'Which Redux middleware should be in use?',
      choices: Object.values(supportedMiddlewares),
    }
  ],
  projectFilesToOverride: {
    rootEpic: 'src/app/store/rootEpic.ts',
    rootSaga: 'src/app/store/rootSaga.ts',
    storeConfig: 'src/app/store/index.ts',
    package: 'package.json',
  },
  templatesFolder: '/templates'
}