import {IObj} from '../../common/models/commonModel';
import {ESettingActions} from '../constants/reducersConst';

/**
 * Перечень возможных ключей настроек
 */
export enum ESettingKeys {
  online = 'online',
}

/** Модель параметра системы */
export type TSetting = {
  id: string;
  key: ESettingKeys;
  value: string;
  additional?: string | null;
};

/** Модуль результатов успешного запроса списка параметров системы */
export type ResponseSettingList = Record<ESettingKeys, TSetting>;

/** Модель редьюсера параметров системы */
export type TSettingState = ResponseSettingList | IObj;

/** Модель событий в хранилище параметров */
export type TActionSettingStore = {
  type: ESettingActions;
  settings: ResponseSettingList;
};

/** Модель события в хранилище параметров */
export type TDispatchSettingAction = (payload: TActionSettingStore) => void;

/** Событие для хука редьюсера */
export type TSettingAction = (dispatch: TDispatchSettingAction) => void;

/** Модель методов для вызова событий хранилища параметров */
export type TSettingThunk = {
  setSettings: (settings: ResponseSettingList) => TSettingAction;
};

/** Модель редьюсера хранилища параметров */
export type TSettingReducer = (state: TSettingState, payload: TActionSettingStore) => TSettingState;

/** Результат вызова хука */
export type TUseSettingsReturned = {
  setting: TSettingState;
  onSetSettings: (settings: ResponseSettingList) => void;
  isOnline: () => boolean;
};

/** Модуль хука для работы с хранилищем */
export type TUseSettings = () => TUseSettingsReturned;
