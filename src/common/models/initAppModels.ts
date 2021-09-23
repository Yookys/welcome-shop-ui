/**
 * Модель конфигурации хостов
 */
export interface IConfig {
  [key: string]: IServiceConfig;
}

/**
 * Модель конфигурации хоста
 */
interface IServiceConfig {
  PATH: string;
  SCHEMA?: string;
  HOST?: string;
  PORT?: string;
}

/**
 * Модель конфигурации
 */
export interface IConfigModel {
  DEBUG: boolean;
  API_BASEPATH?: string;
  SERVICES: IConfig;
}
