import program from 'commander';
import { setupHandlebars } from 'setupHandlebars';
import { version } from './../package.json';
import inquirer from 'inquirer';
import {
  generate,
  createNewProject,
  GenerateCommandOptionType,
} from 'commands';
import { questions } from 'config';

setupHandlebars();

program
  .version(version, '-v, --version')
  .command('generate <type> <name> ')
  .option('-f, --functional', 'functional component')
  .alias('g')
  .description('Generate new file or store')
  .action(() => {
    const [type, name] = program.args;
    generate({
      name,
      type: type as GenerateCommandOptionType,
      shouldBeFunctionalComponent: program.commands[0].functional,
    });
  });

program
  .command('init <name>')
  .alias('i')
  .description('Create new boilerplate project')
  .action(() => inquirer.prompt(questions).then(createNewProject));

program.on('command:*', () => {
  console.error(
    'Invalid command \nSee --help for a list of available commands.',
  ),
    process.exit(1);
});

if (process.argv.length > 6) {
  console.error(
    'Invalid command!\nSee --help for a list of available commands.',
  );
  process.exit(1);
}

try {
  program.parse(process.argv);
} catch (err) {
  const { message } = err as program.CommanderError;
  console.error(message);
  process.exit(1);
}
