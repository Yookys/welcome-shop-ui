import {CombinedState, combineReducers, Reducer} from 'redux';

import {TModalState} from '@core/models/modalStackReducerModels';
import {TSettingState} from '@core/models/settingReducerModels';
import modalStackReducer from '@core/redux/reducers/modalStackReducer';
import settingReducer from '@core/redux/reducers/settingReducer';

export type TReducers = {
  modalStack: TModalState;
  setting: TSettingState;
};

export default combineReducers<Reducer<CombinedState<TReducers>>>({
  /** Стек модальных окон */
  modalStack: modalStackReducer,
  /** Параметры системы */
  setting: settingReducer,
});
