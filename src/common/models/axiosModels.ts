import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {IObj} from './commonModel';

/** Общая модель запроса */
export type TRequest = <T = any, K = any>(url: string, requestConfig: IRequestConfig<T, K>) => void;

/** Общая конфигурация запроса */
export interface IRequestConfig<T = any, K = any> {
  queryParams?: IObj;
  body?: IObj;
  configuration?: AxiosRequestConfig;
  requestKey?: string;
  onSuccess?: (response: AxiosResponse<T>) => void;
  onReject?: (response: AxiosError<K>) => void;
  onFinally?: (response: AxiosResponse<T> | AxiosError<K>) => void;
}

/** Модель прогрессов запросов */
export interface IProgresses {
  [key: string]: number;
}

/** Возвращаемые методы хука */
export type TUseAxiosReturns = {
  getRequestProgress: (requestKey: string) => number;
  getRequest: TRequest;
  postRequest: TRequest;
  putRequest: TRequest;
  patchRequest: TRequest;
  deleteRequest: TRequest;
};

/** Модель для хука */
export type IUseAxios = () => TUseAxiosReturns;

/** Модель ошибки по-умолчанию */
export type TErrorResponseBody = {
  status: number;
  statusText: string;
}
