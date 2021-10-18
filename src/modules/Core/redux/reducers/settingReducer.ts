import {TSettingReducer} from '@core/models/settingReducerModels';
import {ESettingActions} from '@core/constants/reducersConst';

/**
 * Редьюсер для параметров системы
 */
const settingReducer: TSettingReducer = (state = {}, payload) => {
  switch (payload.type) {
    /** Установка параметров системы */
    case ESettingActions.SETTING_SET:
      return payload.settings;
    default:
      return state;
  }
};

export default settingReducer;
