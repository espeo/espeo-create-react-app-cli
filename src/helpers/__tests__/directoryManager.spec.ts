import { escapePath, getOutputDirectory } from 'helpers';

it('should escape path', () => {
  expect(escapePath('/some path/rest')).toEqual('/some\\ path/rest');
});

it('should return directory for output files', () => {
  expect(getOutputDirectory('espeo')).toEqual('espeo');
});
