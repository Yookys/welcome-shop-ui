import {TThunksAppConfig} from '@common/models/appConfigModels';
import {appConfigActions} from '@common/constants/appConfigConst';

/**
 * Асинхронные события для хранилища конфигурации приложения
 */
const appConfigThunk: TThunksAppConfig = {
  /**
   * Сеттер конфигурации приложения
   * @param appConfig - Конфигурация приложения
   * @param envConfig - Конфигурация окружения
   */
  setAppConfigs: (appConfig, envConfig) => (dispatch) =>
    dispatch({type: appConfigActions.setConfig, data: {appConfig, envConfig}}),
  /**
   * Сброс хранилища
   * @param dispatch - Триггер асинхронного события
   */
  resetAppConfig: (dispatch) => dispatch({type: appConfigActions.reset, data: {}}),
};

export default appConfigThunk;
