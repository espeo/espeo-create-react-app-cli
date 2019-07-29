import { {{capitalize name}}Reducer } from '../{{toLowerCase name}}.reducer';

describe('{{capitalize name}} Reducers', () => {
  it('should return default state ', () => {
    const state = {{capitalize name}}Reducer(undefined as any, {} as any);

    expect(state).toEqual({
      data: null,
      isLoading: false,
      isError: false,
    });
  });
});
