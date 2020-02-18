import path from 'path';
import program from 'commander';
import { templatesFolderName } from 'config';

export const getTemplateFile = (templateSrc: string): string =>
  path.join(__dirname, '..', templatesFolderName, templateSrc);

export const getOutputFile = (outputSrc: string): string =>
  path.join(process.cwd(), program.args[0], outputSrc);
