import React from 'react';

import useUserStore from '@User/hooks/useUserStore';
import CustomRoutes from '@common/components/CustomRoutes/CustomRoutes';
import {EUserRoutingLocations, userRoutings} from '@User/constants/userRoutingConst';
import {isEmpty} from '@common/utils/commonUtils';

/**
 * Роутинг для зарегистрированного пользователя
 */
const UserLayout: React.FC = () => {
  /** Используем хранилище пользователя */
  const {user} = useUserStore();

  return (
    <CustomRoutes
      routes={userRoutings}
      user={user}
      redirectTo={
        !isEmpty(user)
          ? userRoutings[EUserRoutingLocations.user].path
          : userRoutings[EUserRoutingLocations.userLogin].path
      }
    />
  );
};

export default React.memo(UserLayout);
