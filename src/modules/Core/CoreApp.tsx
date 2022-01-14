import React, {Suspense, useEffect} from 'react';

import {isEmpty} from '@common/utils/commonUtils';
import CustomSpinner from '@common/components/CustomSpinner/CustomSpinner';
import {useLocalStorage} from '@common/hooks/useStorage';
import useAppConfig from '@Core/hooks/useAppConfig';
import {getEnvConfig} from '@Core/utils/envConfig';
import {userJwtLocalStorageKey} from '@User/constants/userStoreConst';
import useUserStore from '@User/hooks/useUserStore';
import useUserRest from '@User/hooks/useUserRest';

import {CoreAppContainer, CoreAppContentWrapper} from './CoreApp.styled';

const Header = React.lazy(() => import('@Core/modules/Header/Header'));
const Footer = React.lazy(() => import('@Core/modules/Footer/Footer'));
const MainLayout = React.lazy(() => import('@Core/layouts/MainLayout'));

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
      <Suspense fallback={<CustomSpinner />}>
        <Header />
        <CoreAppContentWrapper>
          <MainLayout />
        </CoreAppContentWrapper>
        <Footer />
      </Suspense>
    </CoreAppContainer>
  );
};

export default React.memo(CoreApp);
