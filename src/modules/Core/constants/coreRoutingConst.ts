import {TRoute} from '@common/models/routingModels';
import React from 'react';

import {isValidDashboard} from '@Core/validators/routingValidators';

const MainPage = React.lazy(() => import('@Core/modules/MainPage/MainPage'));
const User = React.lazy(() => import('@User/User'));
const Catalog = React.lazy(() => import('@Catalog/Catalog'));
const Dashboard = React.lazy(() => import('@Dashboard/Dashboard'));

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
    Component: MainPage,
    exact: true,
  },
  [ECoreRoutingLocations.user]: {
    path: '/user',
    Component: User,
  },
  [ECoreRoutingLocations.catalog]: {
    path: '/catalog',
    Component: Catalog,
  },
  [ECoreRoutingLocations.dashboard]: {
    path: '/dashboard',
    Component: Dashboard,
    isValid: isValidDashboard,
  },
};
