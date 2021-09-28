import React, {useEffect} from 'react';

import ModalStack from './components/ModalStack/ModalStack';
import RootLayout from './layouts/RootLayout';
import useSettingRest from './hooks/useSettingRest';
import useSettings from './hooks/useSettings';
import {isEmpty} from '../common/utils/commonUtils/commonUtils';
import ResponseError from '../common/components/ResponseError/ResponseError';
import Loader from '../common/components/Loader/Loader';

export type RootAppComponent = () => JSX.Element;

/**
 * Корневое приложение
 */
const RootApp: RootAppComponent = () => {
  /** Используем методы для работы с МКС */
  const {isLoadingSettingRest, isErrorSettingRest, errorStatusSettingRest, loadSettingList} = useSettingRest(true);
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
    if (isErrorSettingRest && errorStatusSettingRest) {
      return <ResponseError status={errorStatusSettingRest} />;
    }

    /** Идёт загрузка параметров или параметры пустые */
    if (isLoadingSettingRest || isEmpty(setting)) {
      return <Loader />;
    }

    /** Отрисовка */
    return <RootLayout />;
  };

  return (
    <>
      {renderApp()}
      <ModalStack />
    </>
  );
};

export default React.memo(RootApp);
