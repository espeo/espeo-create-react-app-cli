{{setVar "capitalizedName" (capitalize name)}}

import { Logic } from '@core/domain';

import { RootStore } from '../index';

export const get{{capitalizedName}}Data = ({ {{capitalizedName}} }: RootStore): Logic | null => {{capitalizedName}}.data;
