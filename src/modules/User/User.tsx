import React from 'react';
import useUserStore from '@User/hooks/useUserStore';
import {isEmpty} from '@common/utils/commonUtils';
import WithoutLoggedLayout from '@User/layouts/WithoutLoggedLayout';
import WithLoggedLayout from '@User/layouts/WithLoggedLayout';

/**
 * Входная точка модуля User
 */
const User: React.FC = () => {
  /** Используем хранилище пользователя */
  const {user} = useUserStore();

  /** Слой для незарегистрированного пользователя */
  if (isEmpty(user)) {
    return <WithoutLoggedLayout />;
  }
  /** Слой для зарегистрированного пользователя */
  return <WithLoggedLayout />;
};

export default React.memo(User);
