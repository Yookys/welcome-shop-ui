/** Ключ редьюсера */
export const appConfigAdditionalKey = '[app_config]';

/** Перечень событий в редьюсере */
export const appConfigActions = {
  setConfig: `${appConfigAdditionalKey} set_config`,
  reset: `${appConfigAdditionalKey} reset`,
} as const;

/** Перечень конфигураций сервисов */
export enum EServices {
  user = 'user',
}
