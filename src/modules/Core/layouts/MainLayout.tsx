import React from 'react';

import useUserStore from '@User/hooks/useUserStore';
import {coreRoutings, ECoreRoutingLocations} from '@Core/constants/coreRoutingConst';
import CustomRoutes from '@common/components/CustomRoutes/CustomRoutes';

/**
 * Корневой слой роутинга
 */
const MainLayout: React.FC = () => {
  /** Используем хранилище пользователя */
  const {user} = useUserStore();

  return <CustomRoutes routes={coreRoutings} user={user} redirectTo={coreRoutings[ECoreRoutingLocations.main].path} />;
};

export default React.memo(MainLayout);
