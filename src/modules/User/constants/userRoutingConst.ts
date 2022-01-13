import {TRoute} from '@common/models/routingModels';
import MainUserPage from '@User/modules/MainUserPage/MainUserPage';
import LoginPage from '@User/modules/LoginPage/LoginPage';
import RegistrationPage from '@User/modules/RegistrationPage/RegistrationPage';
import {isValidWithLogin, isValidWithoutLogin} from '@User/validators/routingValidators';
import RecoveryPage from '@User/modules/RecoveryPage/RecoveryPage';

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
    component: MainUserPage,
    exact: true,
    isValid: isValidWithLogin,
  },
  [EUserRoutingLocations.userLogin]: {
    path: '/user/login',
    component: LoginPage,
    exact: true,
    isValid: isValidWithoutLogin,
  },
  [EUserRoutingLocations.userRegistration]: {
    path: '/user/registration',
    component: RegistrationPage,
    exact: true,
    isValid: isValidWithoutLogin,
  },
  [EUserRoutingLocations.userRecovery]: {
    path: '/user/recovery',
    component: RecoveryPage,
    exact: true,
    isValid: isValidWithoutLogin,
  },
};
