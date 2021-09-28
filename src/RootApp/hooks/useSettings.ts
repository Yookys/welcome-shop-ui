import {useDispatch, useSelector} from 'react-redux';
import {TReducers} from '../redux/reducers/rootReducer';
import {ResponseSettingList, TSettingState, TUseSettings} from '../models/settingReducerModels';
import settingThunk from '../redux/thunks/settingThunk';

/**
 * Хук для взаимодействия с хранилищем системных параметров
 */
const useSettings: TUseSettings = () => {
  const dispatch = useDispatch();
  const setting: TSettingState = useSelector((state: TReducers) => state.setting);

  /**
   * Установка параметров системы
   * @param settings - Параметры системы
   */
  const onSetSettings = (settings: ResponseSettingList) => dispatch(settingThunk.setSettings(settings));

  return {setting, onSetSettings};
};

export default useSettings;
