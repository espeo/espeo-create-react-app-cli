{{setVar "capitalizedName" (capitalize name)}}
{{setVar "upperCaseName" (toUpperCase name)}}

import { ReturnType } from '@core/namespace';

export enum {{capitalizedName}}ActionTypes {
  FETCH_{{upperCaseName}} = '[{{capitalizedName}}] Fetch {{capitalizedName}}',
  LOAD_{{upperCaseName}} = '[{{capitalizedName}}] Load {{capitalizedName}}',
  ERROR_{{upperCaseName}} = '[{{capitalizedName}}] Error {{capitalizedName}}',
}

export const fetch{{capitalizedName}} = () => ({
  type: {{capitalizedName}}ActionTypes.FETCH_{{upperCaseName}},
  payload: null,
} as const);

export const load{{capitalizedName}} = (payload: Logic) => ({
  type: {{capitalizedName}}ActionTypes.LOAD_{{upperCaseName}},
  payload,
} as const);

export const error{{capitalizedName}} = () => ({
  type: {{capitalizedName}}ActionTypes.ERROR_{{upperCaseName}},
  payload: null,
} as const);

export type {{capitalizedName}}Actions = ReturnType<typeof fetch{{capitalizedName}}>
 | ReturnType<typeof load{{capitalizedName}}>
 | ReturnType<typeof error{{capitalizedName}}>;
