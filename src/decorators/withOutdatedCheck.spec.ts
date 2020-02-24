import { withOutdatedCheck } from 'decorators';
import { Command } from 'core';
import { exec } from 'helpers';

const command: Command<string> = (_: string): Promise<void> =>
  Promise.resolve();

const consoleWarnSpy = jest.spyOn(global.console, 'warn');

beforeEach(() => {
  consoleWarnSpy.mockClear();
});

it('should return function', () => {
  expect(typeof withOutdatedCheck(exec)(command)).toEqual('function');
});

it('should invoke command', async () => {
  const commandSpy = jest.fn();
  await withOutdatedCheck(exec)(commandSpy)('');
  expect(commandSpy).toBeCalled();
});

it('should invoke console.warn', async () => {
  const execMock = (command: string): Promise<string> => {
    if (command === 'espeo -v') return Promise.resolve('0.0.1');

    return Promise.resolve('0.0.2');
  };

  await withOutdatedCheck(execMock)(command)('');
  expect(consoleWarnSpy).toBeCalled();
});

it('should not invoke console.warn', async () => {
  const execMock = (command: string): Promise<string> => {
    if (command === 'espeo -v') return Promise.resolve('0.1.0');

    return Promise.resolve('0.0.1');
  };

  await withOutdatedCheck(execMock)(command)('');
  expect(consoleWarnSpy).not.toBeCalled();
});
