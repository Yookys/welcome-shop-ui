import {useEffect, useState} from 'react';
import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, Canceler} from 'axios';

import {debug, isEmpty, isFunction, objectToQueryString} from '../../utils/commonUtils/commonUtils';
import {defaultHeaders, defaultReject} from '../../constants/axiosConst';
import axiosInstance from '../../utils/axiosInstance/axiosInstance';
import {DebugTypes, IObj} from '../../models/commonModel';
import {IProgresses, IRequestConfig, IUseAxios, TErrorResponseBody, TRequest} from '../../models/axiosModels';
import configUtil from '../../utils/configUtil/configUtil';

/**
 * Хук для работы с Axios
 */
const useAxios: IUseAxios = () => {
  /** Массив функций для остановки запроса */
  const [cancelFunctions, setCancelFunctions] = useState<Canceler[]>([]);
  /** Объект содержащий прогрессы запросов */
  const [progresses, setProgresses] = useState<IProgresses>({});

  /**
   * Применяем перехватчики
   * И останавливаем запросы при размонтировании
   */
  useEffect(
    () => () => {
      cancelFunctions.forEach((cancelF): void => {
        if (isFunction(cancelF)) {
          cancelF();
        }
      });
    },
    []
  );

  /**
   * Подготовка запроса
   * @param config - Конфигурация запроса
   * @param requestKey - Ключ запроса
   */
  const onPrepareRequest = (config: IObj | undefined, requestKey?: string): object => {
    const configTmp: AxiosRequestConfig = {
      ...config,
      headers: {
        ...defaultHeaders,
        ...(config && !isEmpty(config.headers) ? config.headers : {}),
      },
      onUploadProgress: (progressEvent: any) => {
        if (requestKey) {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader('x-decompressed-content-length');
          setProgresses((prevState) => ({
            ...prevState,
            [requestKey]: Math.round((progressEvent.loaded * 100) / totalLength),
          }));
        }
      },
    };
    configTmp.cancelToken = new Axios.CancelToken((canceler) =>
      setCancelFunctions((prevState) => [...prevState, canceler])
    );
    return configTmp;
  };

  /**
   * Промежуточная обработка успешного запроса
   * @param successFunction - Функция для успешной обработки ответа
   * @param finallyFunction - Функция вызываемая при окончании запроса
   */
  const onSuccessResponse =
    <T>(
      successFunction?: (response: AxiosResponse<T>) => void,
      finallyFunction?: (response: AxiosResponse<T>) => void
    ) =>
    (response: AxiosResponse<T>) => {
      const responseTmp = response;
      if (typeof response.data === 'string') {
        try {
          responseTmp.data = JSON.parse(response.data);
        } catch (e) {
          throw JSON.stringify(defaultReject);
        }
      }
      debug(
        {
          message: 'REQUEST',
          optionalParams: [
            response.status,
            response.config.url,
            {headers: response.request.headers, body: response.data},
          ],
        },
        DebugTypes.log,
        configUtil.debug
      );
      if (finallyFunction && isFunction(finallyFunction)) {
        finallyFunction(responseTmp);
      }
      if (successFunction && isFunction(successFunction)) {
        successFunction(responseTmp);
      }
    };

  /**
   * Обработчик запроса с ошибкой по-умолчанию
   * @param {Function} rejectFunction - Функция для вызова ошибки
   * @param {Function} finallyFunction - Функция вызываемая при окончании запроса
   */
  const onRejectResponse =
    <T>(rejectFunction?: (response: AxiosError<T>) => void, finallyFunction?: (response: AxiosError<T>) => void) =>
    (reject: AxiosError<T>) => {
      if (!Axios.isCancel(reject)) {
        let rejectTmp: any = reject;
        if (
          isEmpty(reject) ||
          isEmpty(reject.response) ||
          (typeof reject.response !== 'undefined' && isEmpty(reject.response.data))
        ) {
          if (!reject.response || typeof reject.response!.data !== 'string') {
            rejectTmp = defaultReject;
          } else {
            try {
              rejectTmp.response.data = JSON.parse(reject.response!.data);
            } catch (e) {
              rejectTmp = defaultReject;
            }
          }
        }
        debug(
          {
            message: 'REQUEST',
            optionalParams: [
              reject.response ? reject.response.status : '(NO STATUS)',
              reject.response ? reject.response.config.url : '(NO URL)',
              {
                headers: reject.request ? reject.request.headers : '(NO HEADERS)',
                body: reject.response ? reject.response.data : '(NO BODY)',
              },
            ],
          },
          DebugTypes.error,
          configUtil.debug
        );
        if (finallyFunction && isFunction(finallyFunction)) {
          finallyFunction(rejectTmp);
        }
        if (rejectFunction && isFunction(rejectFunction)) {
          rejectFunction(rejectTmp);
        }
      }
    };

  /**
   * Геттер для прогресса запроса по ключу
   * @param requestKey - Ключ запроса
   */
  const getRequestProgress = (requestKey: string): number => progresses[requestKey];

  /**
   * GET запрос
   * @param url - URL Запроса
   * @param requestConfig - Конфигурация запроса
   */
  const getRequest: TRequest = async <T = any, K = TErrorResponseBody>(url: string, requestConfig: IRequestConfig<T, K>) => {
    await axiosInstance
      .get<T>(
        `${url}${objectToQueryString(requestConfig.queryParams)}`,
        onPrepareRequest(requestConfig.configuration, requestConfig.requestKey)
      )
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));
  };

  /**
   * POST запрос
   * @param url - URL Запроса
   * @param requestConfig - Конфигурация запроса
   */
  const postRequest: TRequest = async <T = any, K = TErrorResponseBody>(url: string, requestConfig: IRequestConfig<T, K>) => {
    await axiosInstance
      .post<T>(
        `${url}${objectToQueryString(requestConfig.queryParams)}`,
        requestConfig.body,
        onPrepareRequest(requestConfig.configuration, requestConfig.requestKey)
      )
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));
  };

  /**
   * PUT запрос
   * @param url - URL Запроса
   * @param requestConfig - Конфигурация запроса
   */
  const putRequest: TRequest = async <T = any, K = TErrorResponseBody>(url: string, requestConfig: IRequestConfig<T, K>) => {
    await axiosInstance
      .put<T>(
        `${url}${objectToQueryString(requestConfig.queryParams)}`,
        requestConfig.body,
        onPrepareRequest(requestConfig.configuration, requestConfig.requestKey)
      )
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));
  };

  /**
   * PATCH запрос
   * @param url - URL Запроса
   * @param requestConfig - Конфигурация запроса
   */
  const patchRequest: TRequest = async <T = any, K = TErrorResponseBody>(url: string, requestConfig: IRequestConfig<T, K>) => {
    await axiosInstance
      .patch<T>(
        `${url}${objectToQueryString(requestConfig.queryParams)}`,
        requestConfig.body,
        onPrepareRequest(requestConfig.configuration, requestConfig.requestKey)
      )
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));
  };

  /**
   * DELETE запрос
   * @param url - URL Запроса
   * @param requestConfig - Конфигурация запроса
   */
  const deleteRequest: TRequest = async <T = any, K = TErrorResponseBody>(url: string, requestConfig: IRequestConfig<T, K>) => {
    await axiosInstance
      .delete<T>(
        `${url}${objectToQueryString(requestConfig.queryParams)}`,
        onPrepareRequest(requestConfig.configuration, requestConfig.requestKey)
      )
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));
  };

  return {
    getRequestProgress,
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest,
  };
};

export default useAxios;
