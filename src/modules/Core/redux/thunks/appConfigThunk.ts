import {TThunksAppConfig} from '@Core/models/appConfigModels';
import {appConfigActions} from '@Core/constants/appConfigConst';

/**
 * Асинхронные события для хранилища конфигурации приложения
 */
const appConfigThunk: TThunksAppConfig = {
  /**
   * Сеттер конфигурации приложения
   * @param envConfig - Конфигурация окружения
   */
  setAppConfigs: (envConfig) => (dispatch) =>
    dispatch({type: appConfigActions.setConfig, data: {envConfig}}),
  /**
   * Сброс хранилища
   * @param dispatch - Триггер асинхронного события
   */
  resetAppConfig: (dispatch) => dispatch({type: appConfigActions.reset, data: {}}),
};

export default appConfigThunk;
