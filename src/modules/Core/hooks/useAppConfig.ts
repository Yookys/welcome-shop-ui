import {useDispatch, useSelector} from 'react-redux';

import {TEnvConfig, TUseAppConfig, TUseAppConfigReducers} from '@Core/models/appConfigModels';
import appConfigThunk from "@Core/redux/thunks/appConfigThunk";

/**
 * Хук для взаимодействия с хранилищем конфигурации приложения
 */
const useAppConfig = (): TUseAppConfig => {
  /** Используем хранилище конфигурации приложения */
  const {envConfig} = useSelector((state: TUseAppConfigReducers) => state.appConfig);
  /** Используем триггер асинхронных событий */
  const dispatch = useDispatch();
  /** Деструкторизация асинхронных функций (Thunk`s) */
  const {setAppConfigs, resetAppConfig} = appConfigThunk;

  /**
   * Сеттер конфигурации приложения
   * @param nextEnv - Конфигурация окружения
   */
  const onSetAppConfigs = (nextEnv: TEnvConfig) => dispatch(setAppConfigs(nextEnv));

  /**
   * Сброс хранилища
   */
  const onResetAppConfig = () => dispatch(resetAppConfig);

  return {
    envConfig,
    onSetAppConfigs,
    onResetAppConfig,
  };
};

export default useAppConfig;
