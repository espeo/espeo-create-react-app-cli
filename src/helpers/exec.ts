import { exec as childExec } from 'child_process';

export type Exec = (command: string) => Promise<string>;

export const exec: Exec = (command: string): Promise<string> =>
  new Promise(function(resolve, reject) {
    childExec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  });
