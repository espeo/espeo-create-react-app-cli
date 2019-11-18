import { Logic } from '@core/domain/logic';
import { {{capitalize name}}Actions, {{capitalize name}}ActionTypes } from './{{toLowerCase name}}.actions';

export interface {{capitalize name}}State {
  isLoading: boolean;
  isError: boolean;
  data: Logic | null;
}

const defaultState: {{capitalize name}}State = {
  isLoading: false,
  isError: false,
  data: null,
};

export const {{capitalize name}}Reducer = (
  state = defaultState,
  action: {{capitalize name}}Actions,
): {{capitalize name}}State => {
  switch (action.type) {
    case {{ capitalize name }}ActionTypes.FETCH_{ { toUpperCase name } }:
    return {
      ...state,
      isLoading: true,
    };
    case {{ capitalize name }}ActionTypes.LOAD_{ { toUpperCase name } }:
    return {
      ...state,
      isLoading: false,
      data: action.payload,
    };
    case { { capitalize name } } ActionTypes.ERROR_{ { toUpperCase name } }:
    return {
      ...state,
      isError: false,
    };
  default:
    return state;
  }
};

