import {TReducerAppConfig} from '@common/models/appConfigModels';
import {appConfigActions} from '@common/constants/appConfigConst';

/**
 * Редьюсер конфигурации приложения
 * @param state - Текущее состояние
 * @param payload - Событие
 */
const appConfigReducer: TReducerAppConfig = (state = {}, payload) => {
  switch (payload.type) {
    /** Установка конфигурации приложения */
    case appConfigActions.setConfig:
      if (payload.data.appConfig && payload.data.envConfig) {
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
