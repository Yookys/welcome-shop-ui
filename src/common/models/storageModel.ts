/** Модель хранилища */
export interface Storage<V = any> {
  getItem(key: string): Maybe<V>;
  setItem(key: string, value: Maybe<V>): void;
  removeItem(key: string): void;
}

/** Значение в хранилище */
export type Maybe<V> = V | null;

/** Событие в хранилище */
export interface StorageEvent<V = unknown> {
  key: string;
  value: Maybe<V>;
  storage: Storage<V>;
}

/** Слушатель события хранилища */
export type StorageEventHandler<V = any> = (event: StorageEvent<V>) => void;

/** Параметры хранилища */
export interface Params<V> {
  key: string;
  type: string;
  storage: Storage<V>;
}
