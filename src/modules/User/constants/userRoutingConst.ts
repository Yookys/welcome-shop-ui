import React from 'react';

import {TRoute} from '@common/models/routingModels';
import {isValidWithLogin, isValidWithoutLogin} from '@User/validators/routingValidators';

const MainUserPage = React.lazy(() => import('@User/modules/MainUserPage/MainUserPage'));
const LoginPage = React.lazy(() => import('@User/modules/LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('@User/modules/RegistrationPage/RegistrationPage'));
const RecoveryPage = React.lazy(() => import('@User/modules/RecoveryPage/RecoveryPage'));

/** Перечень возможных локаций */
export enum EUserRoutingLocations {
  user = 'user',
  userLogin = 'userLogin',
  userRegistration = 'userRegistration',
  userRecovery = 'userRecovery',
}

export const userRoutings: Record<string, TRoute> = {
  [EUserRoutingLocations.user]: {
    path: '/user',
    Component: MainUserPage,
    exact: true,
    isValid: isValidWithLogin,
  },
  [EUserRoutingLocations.userLogin]: {
    path: '/user/login',
    Component: LoginPage,
    exact: true,
    isValid: isValidWithoutLogin,
  },
  [EUserRoutingLocations.userRegistration]: {
    path: '/user/registration',
    Component: RegistrationPage,
    exact: true,
    isValid: isValidWithoutLogin,
  },
  [EUserRoutingLocations.userRecovery]: {
    path: '/user/recovery',
    Component: RecoveryPage,
    exact: true,
    isValid: isValidWithoutLogin,
  },
};
