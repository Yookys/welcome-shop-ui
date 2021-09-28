import useAxios from '../../common/hooks/useAxios/useAxios';
import {ResponseSettingList} from '../models/settingReducerModels';
import configUtil from '../../common/utils/configUtil/configUtil';
import services from '../../common/constants/configConst';
import {IRequestConfig} from '../../common/models/axiosModels';

export type TUseSettingApiReturned = {
  onGetSettingsList: (config: IRequestConfig<ResponseSettingList>) => void;
};

export type TUseSettingApi = () => TUseSettingApiReturned;

/**
 * КОНТРАКТ.
 * Хук для работы с API /api/v1/setting
 */
const useSettingApi: TUseSettingApi = () => {
  /** Используем инструменты Axios */
  const {getRequest} = useAxios();

  /**
   * Запрос списка параметров системы
   */
  const onGetSettingsList = (config: IRequestConfig<ResponseSettingList>) =>
    getRequest<ResponseSettingList>(configUtil.services[services.setting], config);

  return {onGetSettingsList};
};

export default useSettingApi;
