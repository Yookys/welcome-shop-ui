import {TEnvService} from '@Core/models/appConfigModels';

/**
 * Формирование базового пути до МКС пользователей
 * @param service - Сервис
 */
export const createUserServiceBasePath = (service?: TEnvService) => () =>
  !service ? '' : `${service.host}/api${service.gatewayPath}/v${service.version}`;
