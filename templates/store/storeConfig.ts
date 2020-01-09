import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
{{#ifEquals middleware reduxObservable}}
import { createEpicMiddleware } from 'redux-observable';
{{/ifEquals}}
import createSagaMiddleware from 'redux-saga';
​
import { getArticlesService } from '@core/services';
import { MainArticlesState } from '@pages/MainArticles/namespace';
import { MainActions } from '@pages/MainArticles/store/actions';
​
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
​
{{#ifEquals middleware reduxObservable}}
import { rootEpic } from './rootEpic';
{{/ifEquals}}
​
export interface RootStore {
  main: MainArticlesState;
}
​
{{#ifEquals middleware reduxObservable}}
const dependencies = {
  getArticlesService,
};
export type Dependencies = typeof dependencies;
​
const epicMiddleware = createEpicMiddleware<
  MainActions,
  MainActions,
  RootStore,
  Dependencies
>({
  dependencies,
});
{{/ifEquals}}
​
const sagaMiddleware = createSagaMiddleware();
​
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
​
{{#ifEquals middleware reduxObservable}}
  const middleware = [epicMiddleware, logger];
{{/ifEquals}}
​
{{#ifEquals middleware reduxSaga}}
  const middleware = [sagaMiddleware, logger];
{{/ifEquals}}
​
export const rootStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
​
{{#ifEquals middleware reduxObservable}}
  epicMiddleware.run(rootEpic);
{{/ifEquals}}
​
{{#ifEquals middleware reduxSaga}}
 sagaMiddleware.run(rootSaga);
{{/ifEquals}}