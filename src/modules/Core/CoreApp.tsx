import React, {useEffect} from 'react';

import {isEmpty} from '@common/utils/commonUtils';
import CustomSpinner from '@common/components/CustomSpinner/CustomSpinner';
import {useLocalStorage} from '@common/hooks/useStorage';
import useAppConfig from '@Core/hooks/useAppConfig';
import {getEnvConfig} from '@Core/utils/envConfig';
import Header from '@Core/modules/Header/Header';
import MainLayout from '@Core/layouts/MainLayout';
import Footer from '@Core/modules/Footer/Footer';
import {userJwtLocalStorageKey} from '@User/constants/userStoreConst';
import useUserStore from '@User/hooks/useUserStore';
import useUserRest from '@User/hooks/useUserRest';

import {CoreAppContainer, CoreAppContentWrapper} from './CoreApp.styled';

/**
 * Ядро
 */
const CoreApp: React.FC = () => {
  /** Используем локальное хранилище с JWT */
  const [localJwt] = useLocalStorage<string>(userJwtLocalStorageKey);
  /** Используем хранилище пользователя */
  const {user} = useUserStore();
  /** Используем методы МКС пользователя */
  const {onJwtLogin} = useUserRest();
  /** Используем конфигурацию приложения */
  const {envConfig, onSetAppConfigs, onResetAppConfig} = useAppConfig();

  /** Сеттим и сбрасываем конфигурацию приложения */
  useEffect(() => {
    onSetAppConfigs(getEnvConfig());
    return () => {
      onResetAppConfig();
    };
  }, []);

  /** Совершаем авторизацию пользователя по JWT */
  useEffect(() => {
    if (envConfig && !isEmpty(localJwt) && isEmpty(user)) {
      onJwtLogin();
    }
  }, [envConfig]);

  /** Идёт инициализация приложения или авторизация пользователя по JWT */
  if (isEmpty(envConfig) || (!isEmpty(localJwt) && isEmpty(user))) {
    return <CustomSpinner />;
  }

  return (
    <CoreAppContainer>
      <Header />
      <CoreAppContentWrapper>
        <MainLayout />
      </CoreAppContentWrapper>
      <Footer />
    </CoreAppContainer>
  );
};

export default React.memo(CoreApp);
