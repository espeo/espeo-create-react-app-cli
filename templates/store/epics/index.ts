
{{setVar "capitalizedName" (capitalize name)}}
{{setVar "upperCaseName" (toUpperCase name)}}

import { of, from } from 'rxjs';
import { Epic } from 'redux-observable';
import { RootStore, Dependencies } from '@core/store';

import {
  {{capitalizedName}}ActionTypes,
  load{{capitalizedName}},
  error{{capitalizedName}}
} from '../actions';

const executeGetItemsEpic: Epic<any, any, RootStore, Dependencies> = (
  action$,
  _state$,
  { getArticlesService },
) => {
  return action$.ofType({{capitalizedName}}ActionTypes.FETCH_{{upperCaseName}})
    .mergeMap(({ payload }) => from(getArticlesService(payload))
      .map(response => load{{capitalizedName}}(response))
      .catch(() => of(error{{capitalizedName}}()))
    );
};

export const articlesEpic = [executeGetItemsEpic];
