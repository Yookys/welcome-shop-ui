import * as React from 'react';
import {RouteComponentProps} from 'react-router';

import {EModulesAccess} from '@common/constants/modulesConst';

/** Описание модуля */
export type TModule = {
  path: string;
  entry: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  access: EModulesAccess;
  exact?: boolean;
};
