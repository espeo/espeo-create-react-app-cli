import { Logic } from '@core/domain';

import { RootStore } from '../index';

export const get{{capitalize name}}Data = ({ {{capitalize name}} }: RootStore): Logic | null => {{capitalize name}}.data;
