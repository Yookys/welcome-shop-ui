import {useCallback, useEffect, useState} from 'react';

import eventObserver from '../../services/EventObserver/EventObserver';
import StorageAdapter from '../../utils/StorageAdapter/StorageAdapter';
import {isEmpty} from '../../utils/commonUtils/commonUtils';
import {Storage, StorageEventHandler, StorageEvent, Params, Maybe} from '../../models/storageModel';

/** Проверка события на актуальность */
export const isActualEvent = <V>(event: StorageEvent, storage: Storage<V>, key: string): event is StorageEvent<V> =>
  event.key === key && event.storage === storage;

export type TUseStorageHookReturned<V> = [Maybe<V>, (data: Maybe<V>) => void, () => void];

export type TUseStorageHook = <V>(props: Params<V>) => TUseStorageHookReturned<V>;
/**
 * Общий хук для локальных хранилищ (localstorage либо sessionStorage)
 * @param {string} key - Ключ значения
 * @param {string} type - Тип хранилища
 * @param {Storage} storage - Хранилище
 */
const useStorage: TUseStorageHook = <V>({key, type, storage}: Params<V>) => {
  /** Значение из хранилища */
  const [localValue, setLocalValue] = useState<Maybe<V>>(storage.getItem(key));

  /**
   * Функция для изменения значения
   */
  const handleSetValue = useCallback<(data: Maybe<V>) => void>(
    (data) => {
      storage.setItem(key, data);
      eventObserver.dispatch(type, {
        storage,
        key,
        value: data,
      });
    },
    [key, storage]
  );

  /**
   * Функция для удаления значения
   */
  const handleRemoveValue = useCallback<() => void>(() => {
    storage.removeItem(key);
    eventObserver.dispatch(type, {
      storage,
      key,
      value: null,
    });
  }, [key, storage]);

  /**
   * Формируем событие и подписываемся на изменения в хранилище и применяем новое значение при изменении
   */
  useEffect(() => {
    const handleStorageValueChange: StorageEventHandler<V> = (event): void => {
      if (!isActualEvent<V>(event, storage, key)) {
        return;
      }
      setLocalValue(event.value);
    };
    eventObserver.subscribe(type, handleStorageValueChange);
    return () => {
      eventObserver.unsubscribe(type, handleStorageValueChange);
    };
  }, [storage, key]); // eslint-disable-line

  /**
   * Тут обновляем локальное значение в состоянии и отправляем событие, для обновления значения в других экземплярах этого хука
   */
  useEffect(() => {
    /** Проверяем актуальность */
    if (JSON.stringify(storage.getItem(key)) !== JSON.stringify(localValue)) {
      /** Устанавливаем значение */
      setLocalValue(storage.getItem(key));
      if (!isEmpty(storage.getItem(key))) {
        /** Отправляем событие */
        handleSetValue(storage.getItem(key));
      }
    }
  }, [key, storage, handleSetValue]);

  return [localValue, handleSetValue, handleRemoveValue];
};

/**
 * Обёртка для хуков хранилищ
 * @param webStorage - Указанное хранилище (localstorage либо sessionStorage)
 * @param type - Тип хранилища
 */
const createUseWebStorage =
  (webStorage: Storage | null, type: string) =>
  <V>(key: string) =>
    useStorage<V>({key, type, storage: new StorageAdapter(webStorage)});

/** Хук для localStorage */
export const useLocalStorage = createUseWebStorage(window.localStorage, 'localStorage');

/** Хук для sessionStorage */
export const useSessionStorage = createUseWebStorage(window.sessionStorage, 'sessionStorage');
