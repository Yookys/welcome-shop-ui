/** Текущий хост, на котором запускается UI */
export const localHost: string = `${window.location.protocol}//${window.location.hostname}`;

/** Ключ редьюсера */
export const appConfigAdditionalKey = '[app_config]';

/** Перечень событий в редьюсере */
export const appConfigActions = {
  setConfig: `${appConfigAdditionalKey} set_config`,
  reset: `${appConfigAdditionalKey} reset`,
} as const;
