import React, {useEffect} from 'react';

import ModalStack from './components/ModalStack/ModalStack';
import ResponseError from '../common/components/ResponseError/ResponseError';
import Loader from '../common/components/Loader/Loader';
import OnlineLayout from './layouts/OnlineLayout';
import OfflineLayout from './layouts/OfflineLayout';
import useSettingRest from './hooks/useSettingRest';
import useSettingsState from './hooks/useSettingsState';
import {isEmpty} from '../common/utils/commonUtils/commonUtils';

export type RootAppComponent = () => JSX.Element;

/**
 * Корневое приложение
 */
const RootApp: RootAppComponent = () => {
  /** Используем методы для работы с МКС */
  const {isLoadingSettingRest, isErrorSettingRest, errorStatusSettingRest, loadSettingList} = useSettingRest(true);
  /** Используем хранилище параметров системы */
  const {setting, isOnline} = useSettingsState();

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

    /** Проверка на доступность системы */
    if (!isOnline()) {
      return <OfflineLayout />;
    }

    /** Отрисовка */
    return <OnlineLayout />;
  };

  return (
    <>
      {renderApp()}
      <ModalStack />
    </>
  );
};

export default React.memo(RootApp);
