/** Общая модель для объектов */
export interface IObj {
  [key: string]: any;
}

/** Пространство имён для пустых значений */
export namespace Empty {
  export type String = '';
  export type Object = Record<string, never>;
  export type Array = any[];
  export type Any = any;
  export type Null = null;
  export type Undefined = undefined;
}

/** Пустое значение */
export type Empty = Empty.Array | Empty.Object | Empty.String | Empty.Null | Empty.Undefined | Empty.Any;

/** Типы отладки */
export enum DebugTypes {
  log = 'log',
  info = 'info',
  error = 'error',
  warn = 'warn',
}
