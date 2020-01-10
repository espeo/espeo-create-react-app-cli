{{setVar "capitalizedName" (capitalize name)}}
import { {{capitalizedName}}Actions, {{capitalizedName}}ActionTypes } from '../actions';

export interface {{capitalizedName}}State {
  isLoading: boolean;
  isError: boolean;
  data: any
}

const defaultState: {{capitalizedName}}State = {
  isLoading: false,
  isError: false,
  data: null,
};

export const {{capitalizedName}}Reducer = (
  state = defaultState,
  action: {{capitalizedName}}Actions,
): {{capitalizedName}}State => {
  switch (action.type) {
    case {{ capitalizedName }}ActionTypes.FETCH_{{ toUpperCase name }}:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case {{ capitalizedName }}ActionTypes.LOAD_{{ toUpperCase name }}:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
      };
    case {{ capitalizedName }}ActionTypes.ERROR_{{ toUpperCase name }}:
      return {
        ...state,
        isError: true,
      };
  default:
    return state;
  }
};

