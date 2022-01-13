import {TRoute} from '@common/models/routingModels';
import MainPage from '@Core/modules/MainPage/MainPage';
import User from '@User/User';
import Catalog from '@Catalog/Catalog';
import Dashboard from '@Dashboard/Dashboard';
import {isValidDashboard} from '@Core/validators/routingValidators';

/** Перечень возможных локаций */
export enum ECoreRoutingLocations {
  main = 'main',
  user = 'user',
  catalog = 'catalog',
  dashboard = 'dashboard',
}

export const coreRoutings: Record<string, TRoute> = {
  [ECoreRoutingLocations.main]: {
    path: '/',
    component: MainPage,
    exact: true,
  },
  [ECoreRoutingLocations.user]: {
    path: '/user',
    component: User,
  },
  [ECoreRoutingLocations.catalog]: {
    path: '/catalog',
    component: Catalog,
  },
  [ECoreRoutingLocations.dashboard]: {
    path: '/dashboard',
    component: Dashboard,
    isValid: isValidDashboard,
  },
};
