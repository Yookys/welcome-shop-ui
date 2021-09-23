export interface Storage<V = any> {
  getItem(key: string): Maybe<V>;
  setItem(key: string, value: Maybe<V>): void;
  removeItem(key: string): void;
}

export type Maybe<V> = V | null;

export interface StorageEvent<V = unknown> {
  key: string;
  value: Maybe<V>;
  storage: Storage<V>;
}

export type StorageEventHandler<V = any> = (event: StorageEvent<V>) => void;

export interface Params<V> {
  key: string;
  type: string;
  storage: Storage<V>;
}
