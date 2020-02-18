import { exec as childExec } from 'child_process';

export const exec = (command: string): Promise<string> =>
  new Promise(function(resolve, reject) {
    childExec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  });
