import {render} from '@testing-library/react';
import React from 'react';
import {AxiosResponse} from 'axios';

import useAxios from './useAxios';
import {IRequestConfig, TUseAxiosReturns} from '../../models/axiosModels';

/** Запуск хука */
const setUp = (): TUseAxiosReturns => {
  const returnVal: TUseAxiosReturns | {} = {};
  function TestComponent() {
    Object.assign(returnVal, useAxios());
    return null;
  }
  render(<TestComponent />);
  // @ts-ignore
  return returnVal;
};

/**
 * Тестирование useAxios
 */
describe('useAxios tests', () => {
  const axiosResponse: AxiosResponse = {
    data: {test: 'successTest'},
    status: 200,
    statusText: 'Success',
    headers: {},
    config: {},
  };
  /** Мок экземпляра Axios */
  const mockAxiosInstance = {
    get: () => new Promise((): AxiosResponse => axiosResponse),
    post: () => new Promise((): AxiosResponse => axiosResponse),
    put: () => new Promise((): AxiosResponse => axiosResponse),
    patch: () => new Promise((): AxiosResponse => axiosResponse),
    delete: () => new Promise((): AxiosResponse => axiosResponse),
  };
  /** Хук */
  let hook: TUseAxiosReturns;

  beforeEach(() => {
    jest.mock('../../utils/axiosInstance/axiosInstance', () => mockAxiosInstance);
    hook = setUp();
  });

  /** get request */
  it('get request', () => {
    const getRequestConfig: IRequestConfig = {
      onSuccess: (response) => expect(response.data.test).toBe('successTest'),
      onFinally: () => expect(1).toBe(1),
    };
    hook.getRequest('/test/url', getRequestConfig);
  });

  /** post request */
  it('post request', () => {
    const postRequestConfig: IRequestConfig = {
      onSuccess: (response) => expect(response.data.test).toBe('successTest'),
      onFinally: () => expect(1).toBe(1),
    };
    hook.postRequest('/test/url', postRequestConfig);
  });

  /** put request */
  it('put request', () => {
    const putRequestConfig: IRequestConfig = {
      onSuccess: (response) => expect(response.data.test).toBe('successTest'),
      onFinally: () => expect(1).toBe(1),
    };
    hook.putRequest('/test/url', putRequestConfig);
  });

  /** patch request */
  it('patch request', () => {
    const patchRequestConfig: IRequestConfig = {
      onSuccess: (response) => expect(response.data.test).toBe('successTest'),
      onFinally: () => expect(1).toBe(1),
    };
    hook.patchRequest('/test/url', patchRequestConfig);
  });

  /** delete request */
  it('delete request', () => {
    const deleteRequestConfig: IRequestConfig = {
      onSuccess: (response) => expect(response.data.test).toBe('successTest'),
      onFinally: () => expect(1).toBe(1),
    };
    hook.deleteRequest('/test/url', deleteRequestConfig);
  });

  /** get progress request */
  it('get progress request', () => {
    const requestKey: string = '1';
    const getRequestConfig: IRequestConfig = {
      requestKey,
      onSuccess: () => expect(hook.getRequestProgress(requestKey)).toBe(100),
      onFinally: () => expect(1).toBe(1),
    };
    hook.getRequest('/test/url', getRequestConfig);
  });
});
