import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {TUser} from '@User/models/serviceModels';

/** Модель роутинга */
export type TRoute = {
  exact?: boolean;
  isValid?: (user?: TUser) => boolean;
  path: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
};
