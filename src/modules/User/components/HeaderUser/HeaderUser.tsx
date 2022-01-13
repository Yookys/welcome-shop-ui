import React, {useState} from 'react';
import {Button} from 'antd';
import {LoginOutlined, LogoutOutlined} from '@ant-design/icons';

import {isEmpty} from '@common/utils/commonUtils';
import useRouter from '@common/hooks/useRouter';
import useUserStore from '@User/hooks/useUserStore';
import {EUserRoutingLocations, userRoutings} from '@User/constants/userRoutingConst';
import {userLocalConst} from '@User/constants/userLocalConst';
import useUserRest from '@User/hooks/useUserRest';

import {HeaderUserContainer} from './HeaderUser.styled';

/** Блок пользователя в шапке */
const HeaderUser: React.FC = () => {
  /** Используем хранилище пользователя */
  const {user} = useUserStore();
  /** Используем роутинг */
  const {goTo} = useRouter();
  /** Используем методы МКС */
  const {onLogOut, isSubmitRequest} = useUserRest();
  /** Ключ запроса */
  const [requestKey, setRequestKey] = useState<string | null>(null);

  /**
   * Выход из системы
   */
  const handleLogout = () => setRequestKey(onLogOut());

  if (!user || isEmpty(user)) {
    return (
      <HeaderUserContainer>
        <Button
          type="primary"
          shape="circle"
          title={userLocalConst.auth}
          icon={<LoginOutlined />}
          onClick={goTo(userRoutings[EUserRoutingLocations.userLogin].path)}
          size="middle"
        />
      </HeaderUserContainer>
    );
  }

  return (
    <HeaderUserContainer>
      <Button
        size="middle"
        title={`${userLocalConst.goToProfile}"${user.login}"`}
        onClick={goTo(userRoutings[EUserRoutingLocations.user].path)}
        disabled={isSubmitRequest(requestKey)}
      >
        {user.login}
      </Button>
      <Button
        danger
        type="primary"
        shape="circle"
        size="middle"
        title={userLocalConst.logout}
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        loading={isSubmitRequest(requestKey)}
      />
    </HeaderUserContainer>
  );
};

export default React.memo(HeaderUser);
