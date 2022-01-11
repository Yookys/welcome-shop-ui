import {TReducerAppConfig} from '@Core/models/appConfigModels';
import {appConfigActions} from '@Core/constants/appConfigConst';

/**
 * Редьюсер конфигурации приложения
 * @param state - Текущее состояние
 * @param payload - Событие
 */
const appConfigReducer: TReducerAppConfig = (state = {}, payload) => {
  switch (payload.type) {
    /** Установка конфигурации приложения */
    case appConfigActions.setConfig:
      if (payload.data.envConfig) {
        return payload.data;
      }
      return state;
    /** Сброс хранилища */
    case appConfigActions.reset:
      return {};
    /** Событие по-умолчанию */
    default:
      return state;
  }
};

export default appConfigReducer;
