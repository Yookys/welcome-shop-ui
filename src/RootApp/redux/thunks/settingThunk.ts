import {TSettingThunk} from '../../models/settingReducerModels';
import {ESettingActions} from '../../constants/reducersConst';

/**
 * Асинхронные события для хранилища параметров системы
 */
const settingThunk: TSettingThunk = {
  setSettings: (settings) => (dispatch) => dispatch({type: ESettingActions.SETTING_SET, settings}),
};

export default settingThunk;
