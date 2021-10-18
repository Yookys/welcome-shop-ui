import {useDispatch, useSelector} from 'react-redux';

import {isEmpty} from '@common/utils/commonUtils/commonUtils';

import {TReducers} from '../redux/reducers/rootReducer';
import {ResponseSettingList, TSettingState, TUseSettings} from '../models/settingReducerModels';
import settingThunk from '../redux/thunks/settingThunk';

/**
 * Хук для взаимодействия с хранилищем системных параметров
 */
const useSettingsState: TUseSettings = () => {
  const dispatch = useDispatch();
  const setting: TSettingState = useSelector((state: TReducers) => state.setting);

  /**
   * Установка параметров системы
   * @param settings - Параметры системы
   */
  const onSetSettings = (settings: ResponseSettingList) => dispatch(settingThunk.setSettings(settings));

  const isOnline = () => (isEmpty(setting.online) ? false : setting.online.value === '1');

  return {setting, isOnline, onSetSettings};
};

export default useSettingsState;
