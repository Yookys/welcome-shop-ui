import {Reducer} from 'redux';

import {userStoreActions} from '@User/constants/userStoreConst';
import {TUser} from '@User/models/serviceModels';

/** Тип события в редьюсере конфигурации приложения */
export type TPayloadActionUserStore = typeof userStoreActions[keyof typeof userStoreActions];

/** Модель хранилища конфигураций */
export type TUserStore = {
  user?: TUser;
};

/** Данные события в редьюсере */
export type TPayloadDataUserStore = {
  user?: TUser;
};

/** Информация события в редьюсере */
export type TPayloadUserStore = {
  type: TPayloadActionUserStore;
  data: TPayloadDataUserStore;
};

/** Событие в редьюсере */
export type TDispatchUserStore = (payload: TPayloadUserStore) => void;

/** Промежуточное событие для thunk`а */
export type TActionUserStore = (dispatch: TDispatchUserStore, getState: () => TUseUserStoreReducer) => void;

/** События в хранилище */
export type TThunksUserStore = {
  setUser: (user: TUser) => TActionUserStore;
  resetUserStore: TActionUserStore;
};

/** Модель редьюсера */
export type TReducerUserStore = Reducer<TUserStore, TPayloadUserStore>;

/** Модель хука */
export interface TUseUserStore extends TUserStore {
  onSetUser: (user: TUser) => void;
  onResetUserStore: () => void;
}

/** Модель редьюсера для хука */
export type TUseUserStoreReducer = {
  user: TUserStore;
};
