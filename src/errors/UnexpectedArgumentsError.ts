import { CommanderError } from 'commander';

export class UnexpectedArgumentsError extends CommanderError {
  constructor(argumentsNames: string[]) {
    super(
      1,
      'UnexpectedArgumentsError',
      `error: unexpected value passed for arguments: ${argumentsNames.join(
        ', ',
      )}`,
    );
  }
}
