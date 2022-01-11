import React, {useEffect} from 'react';

import {isEmpty} from '@common/utils/commonUtils';
import CustomSpinner from '@common/components/CustomSpinner/CustomSpinner';
import useAppConfig from '@Core/hooks/useAppConfig';
import {getEnvConfig} from '@Core/utils/envConfig';
import Header from '@Core/modules/Header/Header';
import MainLayout from '@Core/layouts/MainLayout';
import Footer from '@Core/modules/Footer/Footer';

import {CoreAppContainer, CoreAppContentWrapper} from './CoreApp.styled';

/**
 * Ядро
 */
const CoreApp: React.FC = () => {
  /** Используем конфигурацию приложения */
  const {envConfig, onSetAppConfigs, onResetAppConfig} = useAppConfig();

  /** Сеттим и сбрасываем конфигурацию приложения */
  useEffect(() => {
    onSetAppConfigs(getEnvConfig());
    return () => {
      onResetAppConfig();
    };
  }, []);

  /** Идёт инициализация приложения */
  if (isEmpty(envConfig)) {
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
