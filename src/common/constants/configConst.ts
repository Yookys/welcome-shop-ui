export enum EServices {
  setting = 'setting',
}

/**
 * Перечень сервисов, которые должны быть обязательно сконфигурированы
 */
const services: Record<EServices, string> = {
  /** Сервис параметров */
  [EServices.setting]: 'SETTING',
};

export default services;
