import {Reducer} from 'redux';

import {appConfigActions} from '@Core/constants/appConfigConst';

/** Тип события в редьюсере конфигурации приложения */
export type TPayloadActionAppConfig = typeof appConfigActions[keyof typeof appConfigActions];

/** Модель сервиса из окружения */
export type TEnvService = {
  version?: number;
  gatewayPath?: string;
};

/** Конфигурация, полученная из окружения */
export type TEnvConfig = {
  name: string;
  debug: boolean;
  services: {[key: string]: TEnvService};
};

/** Модель хранилища конфигураций */
export type TAppConfigState = {
  envConfig?: TEnvConfig;
};

/** Данные события в редьюсере */
export type TPayloadDataAppConfigState = {
  envConfig?: TEnvConfig;
};

/** Информация события в редьюсере */
export type TPayloadAppConfig = {
  type: TPayloadActionAppConfig;
  data: TPayloadDataAppConfigState;
};

/** Событие в редьюсере */
export type TDispatchAppConfig = (payload: TPayloadAppConfig) => void;

/** Промежуточное событие для thunk`а */
export type TActionAppConfig = (dispatch: TDispatchAppConfig, getState: () => TUseAppConfigReducers) => void;

/** События в хранилище */
export type TThunksAppConfig = {
  setAppConfigs: (envConfig: TEnvConfig) => TActionAppConfig;
  resetAppConfig: TActionAppConfig;
};

/** Модель редьюсера */
export type TReducerAppConfig = Reducer<TAppConfigState, TPayloadAppConfig>;

/** Модель хука */
export interface TUseAppConfig extends TAppConfigState {
  onSetAppConfigs: (envConfig: TEnvConfig) => void;
  onResetAppConfig: () => void;
}

/** Модель редьюсера для хука */
export type TUseAppConfigReducers = {
  appConfig: TAppConfigState;
};
