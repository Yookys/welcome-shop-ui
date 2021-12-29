import {useDispatch, useSelector} from 'react-redux';

import {TAppConfig, TEnvConfig, TUseAppConfig, TUseAppConfigReducers} from '@common/models/appConfigModels';
import appConfigThunk from '@common/redux/thunks/appConfigThunk';

/**
 * Хук для взаимодействия с хранилищем конфигурации приложения
 */
const useAppConfig = (): TUseAppConfig => {
  /** Используем хранилище конфигурации приложения */
  const {appConfig, envConfig} = useSelector((state: TUseAppConfigReducers) => state.appConfig);
  /** Используем триггер асинхронных событий */
  const dispatch = useDispatch();
  /** Деструкторизация асинхронных функций (Thunk`s) */
  const {setAppConfigs, resetAppConfig} = appConfigThunk;

  /**
   * Сеттер конфигурации приложения
   * @param nextConfig - Конфигурация приложения
   * @param nextEnv - Конфигурация окружения
   */
  const onSetAppConfigs = (nextConfig: TAppConfig, nextEnv: TEnvConfig) => dispatch(setAppConfigs(nextConfig, nextEnv));

  /**
   * Сброс хранилища
   */
  const onResetAppConfig = () => dispatch(resetAppConfig);

  return {
    appConfig,
    envConfig,
    onSetAppConfigs,
    onResetAppConfig,
  };
};

export default useAppConfig;
