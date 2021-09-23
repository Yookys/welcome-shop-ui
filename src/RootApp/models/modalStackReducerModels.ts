import {Attributes, FunctionComponentElement} from 'react';
import {EModalStackActions} from '../constants/reducersConst';
import {IObj} from '../../common/models/commonModel';

/** Модель модального окна */
export type TModalItem = {
  closetWithClickOnWrapper: boolean;
  component: FunctionComponentElement<any>;
  props: Attributes;
};

/** Модель payload для модальных окон */
export type TActionModalStore = {
  type: EModalStackActions;
  props: Attributes | null;
  data: TModalItem | null;
  key: null | number;
};

/** Модель события стека модальных окон */
export type TDispatchModalStackAction = (payload: TActionModalStore) => void;

/** Событие для хука редьюсера */
export type TModalStackAction = (dispatch: TDispatchModalStackAction) => void;

/** Модель методов для вызова событий стека модальных окон */
export type TModalStackThunk = {
  openModal: (modal: TModalItem) => TModalStackAction;
  closeModal: () => TModalStackAction;
  closeAllModal: () => TModalStackAction;
  editPropsModal: (props: Attributes, key: number | null) => TModalStackAction;
};

/** Модель состояния стека модальных окон */
export type TModalState = TModalItem[];

/** Модель редьюсера стека модальных окон */
export type TModalStackReducer = (state: TModalState, payload: TActionModalStore) => TModalState;

/** Модель результатов выполнения хука */
export type TUseModalReturned = {
  modalStack: TModalState;
  modal: TModalItem | null;
  props: Attributes | null;
  component: FunctionComponentElement<any> | null;
  openModal: (
    componentModal: FunctionComponentElement<any>,
    propsModal?: IObj,
    closetWithClickOnWrapper?: boolean
  ) => Function;
  editPropsModal: (nextProps: IObj, key?: number) => Function;
  closeLastModal: () => Function;
  closeAllModals: () => Function;
  getPropModalByKey: (key: number) => Attributes;
};

/** Модуль хука */
export type TUseModal = () => TUseModalReturned;
