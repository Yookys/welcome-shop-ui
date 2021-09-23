import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import MainPage from '../pages/MainPage/MainPage';

export type TRootLayoutComponent = () => JSX.Element;

/**
 * Корневые слои роутинга
 */
const RootLayout: TRootLayoutComponent = () => (
  <Switch>
    {/* Главная страница */}
    <Route exact path="/" component={MainPage} />
    {/* Редирект на основную страницу */}
    <Redirect to="/" />
  </Switch>
);

export default React.memo(RootLayout);
