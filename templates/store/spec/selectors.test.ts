import { {{capitalize name}} } from '../{{toLowerCase name}}.selectors';
import { mockStore } from '@core/mocks';

describe('{{capitalize name}} selectors', () => {
  it('get{{capitalize name}}Data', () => {
    expect(get{{capitalize name}}Data(mockStore)).toEqual(null);
  });
});
