import path from 'path';
import program from 'commander';

export const getTemplatesDirectory = (): string =>
  path.join(__dirname, '..', 'templates');

export const getOutputDirectory = (): string =>
  path.join(process.cwd(), program.args[0]);
