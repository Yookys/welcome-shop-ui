import {CombinedState, combineReducers, Reducer} from 'redux';
import modalStackReducer from './modalStackReducer';
import {TModalState} from '../../models/modalStackReducerModels';

export type TReducers = {
  modalStack: TModalState;
};

export default combineReducers<Reducer<CombinedState<TReducers>>>({
  /** Стек модальных окон */
  modalStack: modalStackReducer,
});
