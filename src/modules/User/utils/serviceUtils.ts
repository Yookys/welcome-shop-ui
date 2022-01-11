import {TEnvService} from '@Core/models/appConfigModels';

/**
 * Формирование базового пути до МКС пользователей
 * @param service - Сервис
 */
export const createUserServiceBasePath = (service?: TEnvService) => () =>
  !service ? '' : `${service.host}/${service.version}${service.gatewayPath}`;
