import {TEnvConfig} from '@common/models/appConfigModels';
import devConfig from '@common/config/devConfig.json';
import prodConfig from '@common/config/prodConfig.json';

/**
 * Геттер текущей конфигурации окружения
 */
export const getEnvConfig = (): TEnvConfig => {
  switch (`${process.env.APP_CONFIG}`) {
    case 'DEV':
      return devConfig as unknown as TEnvConfig;
    /** Конфигурация для прода */
    case 'PROD':
    default:
      return prodConfig as unknown as TEnvConfig;
  }
};
