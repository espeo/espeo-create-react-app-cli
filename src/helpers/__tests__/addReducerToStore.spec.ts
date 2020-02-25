import { addReducerToStore } from 'helpers';

const rootStoreContent = `
import { combineReducers, Reducer } from 'redux';
import { mainArticlesReducer } from '@core/pages/MainArticles/store/reducers';

const rootReducer: Reducer = combineReducers({articles: mainArticlesReducer});

export default rootReducer;
`;

it('should update root store content', () => {
  const result = addReducerToStore('users', rootStoreContent);
  expect(result).toEqual(`
import { combineReducers, Reducer } from 'redux';
import { mainArticlesReducer } from '@core/pages/MainArticles/store/reducers';
import { UsersReducer } from '@core/pages/Users/store/reducers/users.reducer';

const rootReducer: Reducer = combineReducers({ articles: mainArticlesReducer,
users: UsersReducer });

export default rootReducer;
`);
});
