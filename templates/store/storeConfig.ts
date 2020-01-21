import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
{{#ifEquals middleware supportedMiddlewares.reduxObservable}}
import { createEpicMiddleware } from 'redux-observable';
{{/ifEquals}}
{{#ifEquals middleware supportedMiddlewares.reduxSaga}}
import createSagaMiddleware from 'redux-saga';
{{/ifEquals}}

{{#ifEquals middleware supportedMiddlewares.reduxObservable}}
import { getArticlesService } from '@core/services';
import { MainActions } from '@pages/MainArticles/store/actions';
{{/ifEquals}}
import { MainArticlesState } from '@pages/MainArticles/namespace';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
{{#ifEquals middleware supportedMiddlewares.reduxObservable}}
import { rootEpic } from './rootEpic';
{{/ifEquals}}
// Blank
export interface RootStore {
  main: MainArticlesState;
}
{{#ifEquals middleware supportedMiddlewares.reduxObservable}}
const dependencies = {
  getArticlesService,
};
// Blank
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
{{#ifEquals middleware supportedMiddlewares.reduxSaga}}
  const sagaMiddleware = createSagaMiddleware();
{{/ifEquals}}
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
{{#ifEquals middleware supportedMiddlewares.reduxObservable}}
  const middleware = [epicMiddleware, logger];
{{/ifEquals}}
{{#ifEquals middleware supportedMiddlewares.reduxSaga}}
  const middleware = [sagaMiddleware, logger];
{{/ifEquals}}
​
export const rootStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
{{#ifEquals middleware supportedMiddlewares.reduxObservable}}
  epicMiddleware.run(rootEpic);
{{/ifEquals}}
{{#ifEquals middleware supportedMiddlewares.reduxSaga}}
 sagaMiddleware.run(rootSaga);
{{/ifEquals}}