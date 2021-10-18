import React from 'react';
import {Redirect, Route, Switch} from 'react-router';

import {modulesOnlineList} from '@core/constants/modulesConst';
import {commonPaths} from '@core/constants/pathsConst';
import {isEmpty} from '@common/utils/commonUtils/commonUtils';

/**
 * Корневые слои роутинга
 */
const OnlineLayout: React.FC = () => (
  <Switch>
    {modulesOnlineList.map((module) => {
      if (!isEmpty(module.access)) {
        return <Route key={module.path} exact={module.exact || false} path={module.path} component={module.entry} />;
      }
      return null;
    })}
    <Redirect to={commonPaths.root} />
  </Switch>
);

export default React.memo(OnlineLayout);
