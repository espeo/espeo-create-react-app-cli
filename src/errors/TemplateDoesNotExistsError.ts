import { CommanderError } from 'commander';

export class TemplateDoesNotExistsError extends CommanderError {
  constructor(templateSrc: string) {
    super(
      1,
      'TemplateDoesNotExistsError',
      `error: template does not exists (${templateSrc})`,
    );
  }
}
