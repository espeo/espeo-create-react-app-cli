import { escapePath } from 'helpers';

it('should escape path', () => {
  expect(escapePath('/some path/rest')).toEqual('/some\\ path/rest');
});
