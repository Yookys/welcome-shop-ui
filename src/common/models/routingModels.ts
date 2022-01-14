import * as React from 'react';

import {TUser} from '@User/models/serviceModels';

/** Модель роутинга */
export type TRoute = {
  exact?: boolean;
  isValid?: (user?: TUser) => boolean;
  path: string;
  Component: React.FC;
};
