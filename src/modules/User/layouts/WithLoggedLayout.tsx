import React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import MainUserPage from '@User/modules/MainUserPage/MainUserPage';

/**
 * Роутинг для зарегистрированного пользователя
 */
const WithLoggedLayout: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/user" component={MainUserPage} />
    <Redirect to="/user" />
  </BrowserRouter>
);

export default React.memo(WithLoggedLayout);
