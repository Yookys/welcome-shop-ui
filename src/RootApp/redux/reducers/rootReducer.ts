import {CombinedState, combineReducers, Reducer} from 'redux';
import modalStackReducer from './modalStackReducer';
import settingReducer from './settingReducer';
import {TModalState} from '../../models/modalStackReducerModels';
import {TSettingState} from '../../models/settingReducerModels';

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
