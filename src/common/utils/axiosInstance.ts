import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

import {defaultHeaders} from '../constants/axiosConst';
import {debug, isEmpty} from './commonUtils';
import {DebugTypes} from '../models/commonModel';

/**
 * Создаём экземпляр Axios
 */
const axiosInstance: AxiosInstance = axios.create({headers: defaultHeaders});

/**
 * Установка предобработчика ответа
 * @param resp - Ответ
 */
export const responseInterceptor = (resp: AxiosResponse): AxiosResponse => {
  const respTmp: AxiosResponse = {...resp};
  if (isEmpty(respTmp.data)) {
    respTmp.data = {};
  }
  debug({message: 'REQUEST SUCCESS:', optionalParams: [respTmp]}, DebugTypes.info);
  return respTmp;
};

/**
 * Установка предобработчика ошибки
 * @param error - Ошибка
 */
export const rejectInterceptor = (error: AxiosError): Promise<AxiosError> => {
  debug({message: 'REQUEST ERROR:', optionalParams: [error]}, DebugTypes.info);
  const errorTmp: AxiosError = {...error};
  if (!errorTmp.response || isEmpty(errorTmp.response)) {
    errorTmp.response = {
      config: {},
      data: undefined,
      headers: {},
      request: undefined,
      status: 500,
      statusText: 'Внутренняя ошибка сервера',
    };
  }
  if (typeof errorTmp.response.data === 'string') {
    errorTmp.response!.data = {status: errorTmp!.response.status, statusText: errorTmp!.response.statusText};
  }
  return Promise.reject(errorTmp);
};

/**
 * Применяем перехватчики
 */
axiosInstance.interceptors.response.use(responseInterceptor, rejectInterceptor);

export default axiosInstance;
