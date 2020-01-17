import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
{{setVar "capitalizedName" (capitalize name)}}
import { getArticlesService } from '@core/services';
import {
  {{capitalizedName}}Types,
  fetch{{capitalizedName}}Success,
  reload{{capitalizedName}},
  fetch{{capitalizedName}}Failed,
} from '../actions';
{{setVar "upperCaseName" (toUpperCase name)}}

export type dateValues = '' | 'today' | 'week' | 'month';

export interface FiltersProps {
  topic: string;
  sortBy: string;
  date: dateValues;
  page: number;
}

const getFilterProps = (payload: any) => {
  return {
    topic: payload.topic || 'sport',
    sortBy: payload.sortBy || '',
    date: payload.date || '',
  };
};

function* get{{capitalizedName}}(action: {
  payload: { page: number; filters: any };
  type: string;
}) {
  try {
    const { page } = action.payload;
    const { topic, sortBy, date } = getFilterProps(action.payload.filters);
    const data = yield call(getArticlesService, page, topic, sortBy, date);
    yield put(fetch{{capitalizedName}}Success(data));
  } catch (e) {
    yield put(fetch{{capitalizedName}}Failed());
  }
}

function* filterSort{{capitalizedName}}(action: { type: string; payload: FiltersProps }) {
  try {
    const { topic, sortBy, date } = getFilterProps(action.payload);
    const page = 1;
    const { data } = yield call(getArticlesService, page, topic, sortBy, date);
    yield put(reload{{capitalizedName}}(data));
  } catch (e) {
    yield put(fetch{{capitalizedName}}Failed());
  }
}

function* clear{{capitalizedName}}Filters() {
  try {
    const { data } = yield call(getArticlesService);
    yield put(reload{{capitalizedName}}(data));
  } catch (e) {
    yield put(fetch{{capitalizedName}}Failed());
  }
}

function* watchGet{{capitalizedName}}() {
  yield takeLatest({{capitalizedName}}Types.FETCH_{{upperCaseName}}, get{{capitalizedName}});
}

function* watchFilter{{capitalizedName}}() {
  yield takeLatest({{capitalizedName}}Types.SORT_{{upperCaseName}}_FILTER, filterSort{{capitalizedName}});
}

function* watchClearFilters() {
  yield takeLatest({{capitalizedName}}Types.CLEAR_FILTERS, clear{{capitalizedName}}Filters);
}

export default function* {{capitalizedName}}Saga() {
  yield all([
    fork(watchGet{{capitalizedName}}),
    fork(watchFilter{{capitalizedName}}),
    fork(watchClearFilters),
  ]);
}
