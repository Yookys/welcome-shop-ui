import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

import {defaultHeaders} from '../../constants/axiosConst';
import {isEmpty} from '../commonUtils/commonUtils';

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
  return respTmp;
};

/**
 * Установка предобработчика ошибки
 * @param error - Ошибка
 */
export const rejectInterceptor = (error: AxiosError): Promise<AxiosError> => {
  const errorTmp: AxiosError = {...error};
  if (!errorTmp.response || isEmpty(errorTmp.response)) {
    errorTmp.response = {
      config: {},
      data: undefined,
      headers: undefined,
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
