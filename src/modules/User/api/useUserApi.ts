import useAppConfig from '@Core/hooks/useAppConfig';
import {useMemo} from 'react';
import {createUserServiceBasePath} from '@User/utils/serviceUtils';
import useAxios from '@common/hooks/useAxios';
import {IRequestConfig, TRejectBodyDefault} from '@common/models/axiosModels';
import {TLoginBody, TRegistrationBody, TUser} from '@User/models/serviceModels';
import {EUserApiMethods, userRestMethods} from '@User/constants/serviceConst';

export type TUseUserApiReturned = {
  onLoginRequest: (config: IRequestConfig<TUser, TRejectBodyDefault, TLoginBody>) => void;
  onLoginByJwtRequest: (config: IRequestConfig<TUser>) => void;
  onLogoutRequest: (config: IRequestConfig) => void;
  onRegistrationRequest: (config: IRequestConfig<string, TRejectBodyDefault, TRegistrationBody>) => void;
};

/**
 * Описание методов API для пользователей
 * КОНТРАКТ
 */
const useUserApi = (): TUseUserApiReturned => {
  /** Используем Axios */
  const {postRequest} = useAxios();
  /** Используем конфигурацию окружения */
  const {envConfig} = useAppConfig();
  /** Базховый путь до МКС */
  const basePath = useMemo(createUserServiceBasePath(envConfig?.services.user), [envConfig]);

  /**
   * Запрос на авторизацию пользователя
   * @param config - Конфигурация запроса
   */
  const onLoginRequest = (config: IRequestConfig<TUser, TRejectBodyDefault, TLoginBody>) =>
    postRequest<TUser, TRejectBodyDefault, TLoginBody>(`${basePath}${userRestMethods[EUserApiMethods.login]}`, config);

  /**
   * Запрос на авторизацию пользователя по JWT
   * @param config - Конфигурация запроса
   */
  const onLoginByJwtRequest = (config: IRequestConfig<TUser>) =>
    postRequest<TUser>(`${basePath}${userRestMethods[EUserApiMethods.jwtLogin]}`, config);

  /**
   * Метод для выхода пользователя из системы
   * @param config - Конфигурация запроса
   */
  const onLogoutRequest = (config: IRequestConfig) =>
    postRequest(`${basePath}${userRestMethods[EUserApiMethods.logout]}`, config);

  /**
   * Запрос на регистрацию пользователя
   * @param config - Конфигурация запроса
   */
  const onRegistrationRequest = (config: IRequestConfig<string, TRejectBodyDefault, TRegistrationBody>) =>
    postRequest<string, TRejectBodyDefault, TRegistrationBody>(
      `${basePath}${userRestMethods[EUserApiMethods.registration]}`,
      config
    );

  return {onLoginRequest, onLoginByJwtRequest, onLogoutRequest, onRegistrationRequest};
};

export default useUserApi;
