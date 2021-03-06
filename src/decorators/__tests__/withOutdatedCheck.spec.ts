import { withOutdatedCheck } from 'decorators';
import { Command } from 'core';

const command: Command<{ id: string }> = (_options: {
  id: string;
}): Promise<void> => Promise.resolve();

const consoleWarnSpy = jest.spyOn(global.console, 'warn');

beforeEach(() => {
  consoleWarnSpy.mockClear();
});

it('should return function', () => {
  const execMock = jest.fn();
  expect(typeof withOutdatedCheck(execMock)(command)).toEqual('function');
});

it('should invoke command and pass options', async () => {
  const execMock = (_: string): Promise<string> => Promise.resolve('0.0.2');

  const commandSpy = jest.fn();
  await withOutdatedCheck(execMock)(commandSpy)({ id: '1' });
  expect(commandSpy).toBeCalledWith({ id: '1' });
});

it('should invoke console.warn if latest version is greater', async () => {
  const execMock = (command: string): Promise<string> => {
    if (command === 'espeo -v') return Promise.resolve('0.0.1');

    return Promise.resolve('0.0.2');
  };

  await withOutdatedCheck(execMock)(command)({ id: '1' });
  expect(consoleWarnSpy).toBeCalled();
});

it('should not invoke console.warn if current version is less', async () => {
  const execMock = (command: string): Promise<string> => {
    if (command === 'espeo -v') return Promise.resolve('0.1.0');

    return Promise.resolve('0.0.1');
  };

  await withOutdatedCheck(execMock)(command)({ id: '1' });
  expect(consoleWarnSpy).not.toBeCalled();
});

it('should not invoke console.warn if current version is equal', async () => {
  const execMock = (command: string): Promise<string> => {
    if (command === 'espeo -v') return Promise.resolve('0.0.1');

    return Promise.resolve('0.0.1');
  };

  await withOutdatedCheck(execMock)(command)({ id: '1' });
  expect(consoleWarnSpy).not.toBeCalled();
});
