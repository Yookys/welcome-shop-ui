import React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import LoginPage from '@User/modules/LoginPage/LoginPage';
import RegistrationPage from '@User/modules/RegistrationPage/RegistrationPage';

/**
 * Роутинг для не зарегистрированного пользователя
 */
const WithoutLoggedLayout: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/user/login" component={LoginPage} />
    <Route exact path="/user/registration" component={RegistrationPage} />
    <Redirect to="/user/login" />
  </BrowserRouter>
);

export default React.memo(WithoutLoggedLayout);
