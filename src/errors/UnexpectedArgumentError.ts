import { CommanderError } from 'commander';

export class UnexpectedCommandArgumentError extends CommanderError {
  constructor(argumentName: string) {
    super(
      1,
      'UnexpectedCommandArgumentError',
      `error: unexpected value passed for argument ${argumentName}`,
    );
  }
}
