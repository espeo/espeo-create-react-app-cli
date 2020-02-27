import path from 'path';

export const getTemplatesDirectory = (): string =>
  path.join(__dirname, '..', 'templates');

export const getOutputDirectory = (outputName: string): string =>
  path.join(process.cwd(), outputName);

export const escapePath = (path: string): string =>
  path.replace(/(\s+)/g, '\\$1');
