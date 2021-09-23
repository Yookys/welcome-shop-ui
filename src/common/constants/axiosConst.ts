import {IObj} from '../models/commonModel';

/**
 * Заголовки по-умолчанию
 */
export const defaultHeaders: IObj = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
  mode: 'no-cors',
};

/**
 * Ответ с ошибкой по-умолчанию
 */
export const defaultReject: IObj = {
  response: {
    status: 500,
    statusText: 'Internal server error',
    data: {
      status: 500,
      statusText: 'Internal server error',
    },
  },
};
