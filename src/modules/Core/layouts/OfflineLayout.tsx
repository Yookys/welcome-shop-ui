import {Redirect, Route, Switch} from 'react-router';
import React from 'react';

import {modulesOfflineList} from '@core/constants/modulesConst';
import {commonPaths} from '@core/constants/pathsConst';
import {isEmpty} from '@common/utils/commonUtils/commonUtils';

/**
 * Слой роутинга при системе в режиме Offline
 * TODO
 */
const OfflineLayout: React.FC = () => (
  <Switch>
    {modulesOfflineList.map((module) => {
      if (!isEmpty(module.access)) {
        return <Route key={module.path} exact={module.exact || false} path={module.path} component={module.entry} />;
      }
      return null;
    })}
    {/* Редирект на основную страницу */}
    <Redirect to={commonPaths.root} />
  </Switch>
);

export default OfflineLayout;
