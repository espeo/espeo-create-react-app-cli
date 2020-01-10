#!/usr/bin/env node

const program = require('commander');
const handlebars = require('handlebars');

handlebars.registerHelper('toLowerCase', str => str.toLowerCase());
handlebars.registerHelper('toUpperCase', str => str.toUpperCase());
handlebars.registerHelper(
  'capitalize',
  str => str.charAt(0).toUpperCase() + str.slice(1),
);
handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
handlebars.registerHelper('setVar', function(varName, varValue, options) {
  options.data.root[varName] = varValue;
});

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
