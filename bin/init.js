#!/usr/bin/env node

const program = require('commander');

const registerHandlebarHelpers = require('../helpers/registerHandlebarHelpers');
const cloneProjectTemplate = require('../helpers/cloneProjectTemplate');

(async () => {
  registerHandlebarHelpers();

  await cloneProjectTemplate();
  
  program
    .version(require('../package').version, '-v, --version')
    .command('generate <type> <name> ')
    .option('-f, --functional', 'functional component')
    .alias('g')
    .description('Generate new file or store')
    .action(() => {
      require('../commands/generate');
    });
  
  program
    .command('init <name>')
    .alias('i')
    .description('Create new boilerplate project')
    .action(() => {
      require('../commands/createNewProject');
    });
  
  program.on('command:*', () => {
    console.log(
      console.error(
        'Invalid command \nSee --help for a list of available commands.',
      ),
    );
    process.exit(1);
  });
  
  if (process.argv.length > 6) {
    console.error(
      'Invalid command!\nSee --help for a list of available commands.',
    );
    process.exit(1);
    return;
  }

  program.parse(process.argv);
})();
