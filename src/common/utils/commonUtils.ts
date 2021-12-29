import React from 'react';

import {DebugTypes, Empty, IObj} from '../models/commonModel';

/**
 * Геттер URL до МКС
 */
export const getServiceApiUrl = (): string => '';

/**
 * Проверка на пустоту
 * @param value - Значение
 */
export const isEmpty = <T extends string | any[] | object | number | undefined | null>(
  value: T | Empty
): value is never => {
  /** Проверка на undefined и null */
  if (typeof value === 'undefined' || value === null) {
    return true;
  }
  /** Проверка на пустой массив */
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  switch (typeof value) {
    /** Проверка на пустой объект */
    case 'object':
      return Object.keys(value).length === 0;
    /** Проверка на пустую строку */
    case 'string':
      return value.length === 0;
    /** Проверка что не NaN */
    case 'number':
      return !Number.isNaN(value) && !Number.isFinite(value);
    default:
      return false;
  }
};

/**
 * Проверка на функцию
 * @param func - Предполагаемая функция
 */
export const isFunction = (func: any): boolean => typeof func === 'function';

/**
 * Перевод объекта в QUERY сроку для GET запросов
 * @param object - Значение
 */
export const objectToQueryString = (object?: IObj): string =>
  !object || isEmpty(object)
    ? ''
    : `?${Object.keys(object)
        .map((key) => `${key}=${object[key]}`)
        .join('&')}`;

/**
 * Перевод QUERY сроку в объект
 * @param strung - Значение
 */
export const queryStringToObject = (strung: string): IObj => {
  const param: IObj = {};
  strung
    .replace('?', '')
    .split('&')
    .forEach((item) => {
      const paramTmp = item.split('=');
      param[paramTmp[0]] = paramTmp[1];
    });
  return param;
};

/**
 * Рандомная строка
 * @param length - Длинна строки
 */
export const randStr = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Создаёт копию
 * @param object - копируемый объект
 */
export const copy = <T>(object: T): T => JSON.parse(JSON.stringify(object));

/**
 * Генерация GUID V4
 */
export const UUID = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>
    (c === 'x' ? (Math.random() * 16) | 0 : (Math.random() * 16) | (0 & 0x3) | 0x8).toString(16)
  );

/**
 * Функция доя дебага ПО
 * Необходима для отладки ПО и скрытия всех сообщений в консоле в сборке
 * @param data - Информация для дебага
 * @param type - Тип сообщения
 */
export const debug = (data: {message: any; optionalParams?: any[]}, type?: DebugTypes) => {
  if (`${process.env.APP_CONFIG}` !== 'PROD') {
    let consoleFunction;
    switch (type) {
      default:
      case DebugTypes.log:
      case DebugTypes.info:
        consoleFunction = console.log;
        break;
      case DebugTypes.warn:
        consoleFunction = console.warn;
        break;
      case DebugTypes.error:
        consoleFunction = console.error;
        break;
    }
    if (data.optionalParams) {
      consoleFunction(data.message, ...data.optionalParams);
    } else {
      consoleFunction(data.message);
    }
  }
};

/**
 * Останавливаем передачу события клика
 * @param event - Событие клика
 */
export const stopPropagation = (event: React.MouseEvent) => event.stopPropagation();
