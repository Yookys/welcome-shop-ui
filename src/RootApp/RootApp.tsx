import React, {useEffect} from 'react';

import ModalStack from './components/ModalStack/ModalStack';
import RootLayout from './layouts/RootLayout';
import {ErrorBoundary} from '../common/components/ErrorBoundary/ErrorBoundary';
import useSettingRest from './hooks/useSettingRest';
import useSettings from './hooks/useSettings';
import {isEmpty} from '../common/utils/commonUtils/commonUtils';

export type RootAppComponent = () => JSX.Element;

/**
 * Корневое приложение
 */
const RootApp: RootAppComponent = () => {
  /** Используем методы для работы с МКС */
  const {isLoadingSettingRest, isErrorSettingRest, loadSettingList} = useSettingRest(true);
  /** Используем хранилище параметров системы */
  const {setting} = useSettings();

  console.log(isErrorSettingRest, isLoadingSettingRest, setting);

  /**
   * Загружаем список параметров системы
   */
  useEffect(() => {
    loadSettingList();
  }, []);

  /**
   * Отрисовка приложения
   */
  const renderApp = (): JSX.Element => {
    /** Произошла ошибка */
    if (isErrorSettingRest) {
      return <p>Error</p>;
    }

    /** Идёт загрузка или параметры пустые */
    if (isLoadingSettingRest || isEmpty(setting)) {
      return <p>Loading</p>;
    }

    /** Отрисовка  */
    return <RootLayout />;
  };

  return (
    <ErrorBoundary globalError>
      {renderApp()}
      <ModalStack />
    </ErrorBoundary>
  );
};

export default React.memo(RootApp);
