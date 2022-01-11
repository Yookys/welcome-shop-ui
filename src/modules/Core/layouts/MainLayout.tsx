import React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import MainPage from '@Core/modules/MainPage/MainPage';
import User from '@User/User';
import useUserStore from '@User/hooks/useUserStore';
import Catalog from '@Catalog/Catalog';
import Dashboard from '@Dashboard/Dashboard';

/**
 * Корневой слой роутинга
 */
const MainLayout: React.FC = () => {
  /** Используем хранилище пользователя */
  const {user} = useUserStore();

  return (
    <BrowserRouter>
      <Route exact path="/" component={MainPage} />
      <Route path="/user" component={User} />
      <Route path="/catalog" component={Catalog} />
      {user && user.access === 10 && <Route path="/dashboard" component={Dashboard} />}
      <Redirect to="/" />
    </BrowserRouter>
  );
};

export default React.memo(MainLayout);
