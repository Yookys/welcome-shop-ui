import {useState} from 'react';

import useUserApi from '@User/api/useUserApi';
import {UUID} from '@common/utils/commonUtils';
import {AxiosError, AxiosResponse} from 'axios';
import {TUser} from '@User/models/serviceModels';
import {TRejectBodyDefault} from '@common/models/axiosModels';
import useUserStore from '@User/hooks/useUserStore';
import {useLocalStorage} from '@common/hooks/useStorage';
import {userJwtLocalStorageKey} from '@User/constants/userStoreConst';

export type TUseUserRestReturned = {
  onLogin: (login: string, password: string) => string;
  onJwtLogin: () => void;
  onLogOut: () => string;
  onRegistration: (login: string, password: string, email: string, onSuccess: () => void) => string;
  isSubmitRequest: (requestKey: string | null) => boolean | undefined;
  getErrorRequest: (requestKey: string | null) => string | undefined;
};

/**
 * Хук для взаимодействия с методами МКС
 */
const useUserRest = (): TUseUserRestReturned => {
  /** Используем методы МКС */
  const {onLoginRequest, onLoginByJwtRequest, onLogoutRequest, onRegistrationRequest} = useUserApi();
  /** Используем хранилище пользователя */
  const {onResetUserStore, onSetUser} = useUserStore();
  /** Используем локальное хранилище с JWT */
  const [localJwt, setLocalJwt, removeLocalJwt] = useLocalStorage<string>(userJwtLocalStorageKey);
  /** Список флагов выполняемых запросов */
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean | undefined}>({});
  /** Список ошибок выполненных запросов */
  const [errorTexts, setErrorTexts] = useState<{[key: string]: string | undefined}>({});

  /**
   * Проверка на выполняемый запрос
   * @param requestKey - Ключ запроса
   */
  const isSubmitRequest = (requestKey: string | null): boolean => (requestKey ? !!isLoading[requestKey] : false);

  /**
   * Завершение выполнения запроса
   * @param requestKey - Ключ запроса
   */
  const setIsSubmitStart = (requestKey: string) => setIsLoading((prevState) => ({...prevState, [requestKey]: true}));

  /**
   * Завершение выполнения запроса
   * @param requestKey - Ключ запроса
   */
  const setIsSubmitEnd = (requestKey: string) => () => {
    const isLoadingTmp = Object.assign(isLoading);
    delete isLoadingTmp[requestKey];
    setIsLoading(isLoadingTmp);
  };

  /**
   * Установка ошибки запроса
   * @param requestKey - Ключ запроса
   * @param text - Текст запроса
   */
  const setRequestError = (requestKey: string, text: string) =>
    setErrorTexts((prevState) => ({...prevState, [requestKey]: text}));

  /**
   * Удаление ошибки запроса
   * @param requestKey - Ключ запроса
   */
  const removeRequestError = (requestKey: string) => {
    const errorsTmp = Object.assign(errorTexts);
    delete errorsTmp[requestKey];
    setErrorTexts(errorsTmp);
  };

  /**
   * Геттер ошибки запроса
   * @param requestKey - Ключ запроса
   */
  const getErrorRequest = (requestKey: string | null): string | undefined =>
    requestKey ? errorTexts[requestKey] : undefined;

  /**
   * Успешная авторизация
   * @param response - Результат запроса на авторизацию
   */
  const onSuccessLogin = (response: AxiosResponse<TUser>) => {
    setLocalJwt(response.data.jwt);
    onSetUser(response.data);
  };

  /**
   * Обработка запроса на авторизацию с ошибкой
   * @param requestId - ID запроса
   */
  const onRejectLogin = (requestId: string) => (reject: AxiosError<TRejectBodyDefault>) =>
    setRequestError(requestId, reject.response?.data?.statusText || 'Ошибка авторизации');

  /**
   * Обработка запроса на авторизацию по JWT с ошибкой
   */
  const onRejectJwtLogin = () => removeLocalJwt();

  /** Успешный выход из системы */
  const onSuccessLogout = () => {
    removeLocalJwt();
    onResetUserStore();
  };

  /**
   * Обработка запроса на регистрацию с ошибкой
   * @param requestId - ID запроса
   */
  const onRejectRegistration = (requestId: string) => (reject: AxiosError<TRejectBodyDefault>) =>
    setRequestError(requestId, reject.response?.data.statusText || 'Ошибка регистрации');

  /**
   * Авторизация пользователя по логину и паролю
   * @param login - Логин
   * @param password - Пароль
   */
  const onLogin = (login: string, password: string): string => {
    const requestId = UUID();
    setIsSubmitStart(requestId);
    removeRequestError(requestId);
    onLoginRequest({
      body: {login, password},
      onSuccess: onSuccessLogin,
      onReject: onRejectLogin(requestId),
      onFinally: setIsSubmitEnd(requestId),
    });
    return requestId;
  };

  /**
   * Авторизация пользователя по JWT
   */
  const onJwtLogin = (): void => {
    if (localJwt) {
      onLoginByJwtRequest({
        onSuccess: onSuccessLogin,
        onReject: onRejectJwtLogin,
      });
    }
  };

  /**
   * Запрос на выход из системы
   */
  const onLogOut = (): string => {
    const requestId = UUID();
    setIsSubmitStart(requestId);
    onLogoutRequest({onSuccess: onSuccessLogout, onFinally: setIsSubmitEnd(requestId)});
    return requestId;
  };

  /**
   * Запрос на регистрацию пользователя
   * @param login - Логин
   * @param password - Пароль
   * @param email - Email
   * @param onSuccess - Функция, для успешной обработки запроса на регистрацию
   */
  const onRegistration = (login: string, password: string, email: string, onSuccess: () => void): string => {
    const requestId = UUID();
    setIsSubmitStart(requestId);
    removeRequestError(requestId);
    onRegistrationRequest({
      body: {login, password, email},
      onSuccess,
      onReject: onRejectRegistration(requestId),
      onFinally: setIsSubmitEnd(requestId),
    });
    return requestId;
  };

  return {onLogin, onJwtLogin, onLogOut, onRegistration, isSubmitRequest, getErrorRequest};
};

export default useUserRest;
