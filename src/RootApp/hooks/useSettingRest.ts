import {AxiosError, AxiosResponse} from 'axios';
import {useState} from 'react';

import useSettingApi from '../api/useSettingApi';
import {ResponseSettingList} from '../models/settingReducerModels';
import useSettings from './useSettings';
import {TErrorResponseBody} from '../../common/models/axiosModels';
import {isEmpty} from '../../common/utils/commonUtils/commonUtils';

export type TUseSettingRestReturned = {
  errorStatusSettingRest: number | null | undefined;
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
  const [errorStatus, setErrorStatus] = useState<number | null | undefined>(null);
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
  const onReject = (reject: AxiosError<TErrorResponseBody>) =>
    setErrorStatus(reject.response?.status || reject.response?.data.status);

  /**
   * Обработка окончания запроса
   */
  const onFinally = () => setIsLoading(false);

  /**
   * Загрузка списка параметров
   */
  const loadSettingList = () => onGetSettingsList({onSuccess, onReject, onFinally});

  return {
    isErrorSettingRest: !isEmpty(errorStatus),
    errorStatusSettingRest: errorStatus,
    isLoadingSettingRest: isLoading,
    loadSettingList,
  };
};

export default useSettingRest;
