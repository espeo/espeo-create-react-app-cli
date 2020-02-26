import program from 'commander';
import { setupHandlebars } from 'setupHandlebars';
import { version } from './../package.json';
import {
  generateCommandFactory,
  createNewProjectCommandFactory,
  GenerateCommandOptionType,
} from 'commands';
import {
  generateComponent,
  generateStore,
  cloneProjectTemplate,
  installDependencies,
  updateCiFiles,
  updatePackageJson,
  updateStoreConfig,
  copyAssets,
} from 'services';
import { Command } from 'core';

setupHandlebars();

const generate = generateCommandFactory({ generateComponent, generateStore });

const createNewProject = createNewProjectCommandFactory({
  cloneProjectTemplate,
  copyAssets,
  installDependencies,
  updateCiFiles,
  updatePackageJson,
  updateStoreConfig,
});

const runCommand = <T>(command: Command<T>, options: T): Promise<void> =>
  Promise.resolve(command(options)).catch((error: Error) =>
    console.error(error.message),
  );

program
  .version(version, '-v, --version')
  .command('generate <type> <name> ')
  .option('-f, --functional', 'functional component')
  .alias('g')
  .description('Generate new file or store')
  .action(
    (
      type: GenerateCommandOptionType,
      name: string,
      { functional }: { functional?: boolean },
    ) =>
      runCommand(generate, {
        name,
        type,
        functional,
      }),
  );

program
  .command('init <name>')
  .alias('i')
  .description('Create new boilerplate project')
  .action((projectName: string) =>
    runCommand(createNewProject, {
      projectName,
    }),
  );

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

program.parse(process.argv);
