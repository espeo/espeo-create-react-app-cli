module.exports = [
  {
    type: 'confirm',
    name: 'includeCypress',
    message: `Should Cypress configuration be included?`,
  },
  {
    type: 'list',
    name: 'packageManager',
    message: 'Which package manager should be used to install dependencies?',
    choices: ['Yarn', 'NPM'],
  },
  {
    type: 'list',
    name: 'middleware',
    message: 'Which Redux middleware should be in use?',
    choices: ['Redux Saga', 'Redux Observable'],
  },
];
