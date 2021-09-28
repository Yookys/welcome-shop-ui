import {AxiosResponse} from 'axios';
import {useState} from 'react';

import useSettingApi from '../api/useSettingApi';
import {ResponseSettingList} from '../models/settingReducerModels';
import useSettings from './useSettings';

export type TUseSettingRestReturned = {
  isErrorSettingRest: boolean;
  isLoadingSettingRest: boolean;
  loadSettingList: () => void;
};

export type TUseSettingRest = (isLoadingInitValue?: boolean) => TUseSettingRestReturned;

/**
 * Хук для работы с методами /api/v1/setting
 */
const useSettingRest: TUseSettingRest = (isLoadingInitValue = false) => {
  /** Используем API сервиса */
  const {onGetSettingsList} = useSettingApi();
  /** Используем хук для работы с хранилищем */
  const {onSetSettings} = useSettings();
  /** Флаг неуспешного запроса */
  const [isError, setIsError] = useState<boolean>(false);
  /** Флаг выполнения запроса */
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingInitValue);

  /**
   * Обработка успешного запроса списка параметров
   * @param response - Результат запроса
   */
  const onSuccess = (response: AxiosResponse<ResponseSettingList>) => onSetSettings(response.data);

  /**
   * Обработка запроса с ошибкой списка параметров
   */
  const onReject = () => setIsError(true);

  /**
   * Обработка окончания запроса
   */
  const onFinally = () => setIsLoading(false);

  /**
   * Загрузка списка параметров
   */
  const loadSettingList = () => onGetSettingsList({onSuccess, onReject, onFinally});

  return {isErrorSettingRest: isError, isLoadingSettingRest: isLoading, loadSettingList};
};

export default useSettingRest;
