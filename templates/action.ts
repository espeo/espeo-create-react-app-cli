import { Logic } from '@core/domain';
import { ReturnType } from '@core/utils';

export enum {{capitalize name}}ActionTypes {
  FETCH_{{capitalize name}} = '[{{capitalize name}}] Fetch {{capitalize name}}',
  LOAD_{{capitalize name}} = '[{{capitalize name}}] Load {{capitalize name}}',
  ERROR_{{capitalize name}} = '[{{capitalize name}}] Error {{capitalize name}}',
}

export const fetch{{capitalize name}} = () => ({
  type: {{capitalize name}}ActionTypes.FETCH_{{capitalize name}},
  payload: null,
} as const);

export const load{{capitalize name}} = (payload: Logic) => ({
  type: {{capitalize name}}ActionTypes.LOAD_{{capitalize name}},
  payload,
} as const);

export const error{{capitalize name}} = () => ({
  type: {{capitalize name}}ActionTypes.ERROR_{{capitalize name}},
  payload: null,
} as const);

export type {{capitalize name}}Actions = ReturnType<typeof fetch{{capitalize name}}>
 | ReturnType<typeof load{{capitalize name}}>
 | ReturnType<typeof error{{capitalize name}}>;
