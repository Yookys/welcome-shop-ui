import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {TRoute} from '@common/models/routingModels';
import {TUser} from '@User/models/serviceModels';
import {isFunction} from '@common/utils/commonUtils';

/**
 * Кастомный роутинг
 * @param routes - Маппинг роутингов
 * @param user - Пользователь для валидации
 * @param redirectTo - Редирект на страницу
 */
const CustomRoutes: React.FC<{routes: Record<string, TRoute>; user?: TUser; redirectTo?: string}> = ({
  routes,
  user,
  redirectTo,
}) => (
  <Switch>
    {Object.keys(routes).map((routeKey) => {
      const {isValid, exact, path, component} = routes[routeKey];
      if (isValid !== undefined && isFunction(isValid)) {
        if (isValid(user)) {
          return <Route key={routeKey} exact={exact} path={path} component={component} />;
        }
        return null;
      }
      return <Route key={routeKey} exact={exact} path={path} component={component} />;
    })}
    {redirectTo && <Redirect to={redirectTo} />}
  </Switch>
);

export default CustomRoutes;
