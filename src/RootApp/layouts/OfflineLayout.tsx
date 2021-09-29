import {Redirect, Route, Switch} from 'react-router';
import React from 'react';

import OfflinePage from '../pages/OfflinePage/OfflinePage';

export type TOfflineLayout = () => JSX.Element;

/**
 * Слой роутинга при системе в режиме Offline
 */
const OfflineLayout: TOfflineLayout = () => (
  <Switch>
    {/* Главная страница */}
    <Route exact path="/" component={OfflinePage} />
    {/* Редирект на основную страницу */}
    <Redirect to="/" />
  </Switch>
);

export default OfflineLayout;
