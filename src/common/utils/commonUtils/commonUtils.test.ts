import {
  copy,
  debug,
  isEmpty,
  isFunction,
  objectToQueryString,
  queryStringToObject,
  randStr,
  safeLowerCaseString,
  UUID,
} from './commonUtils';
import {DebugTypes, IObj} from '../../models/commonModel';

/**
 * Тестирование утилит
 */
describe('Common utils tests', () => {
  /** Объект query для тестирования */
  const queryObj: IObj = {test: '123', value: '333'};
  /** Строка query для тестирования */
  const stringQuery: string = '?test=123&value=333';

  beforeEach(() => {
    jest.resetModules();
  });

  /** isEmpty */
  it('isEmpty', () => {
    ['', [], {}, undefined, null].forEach((value) => {
      expect(isEmpty(value)).toBeTruthy();
    });
    ['test', ['test'], {test: 'test'}, 10].forEach((value) => {
      expect(isEmpty(value)).toBeFalsy();
    });
  });

  /** isFunction */
  it('isFunction', () => {
    expect(isFunction('test')).toBeFalsy();
    expect(isFunction(() => {})).toBeTruthy();
  });

  /** objectToQueryString */
  it('objectToQueryString', () => {
    expect(objectToQueryString()).toEqual('');
    expect(objectToQueryString(queryObj)).toEqual(stringQuery);
  });

  /** queryStringToObject */
  it('queryStringToObject', () => {
    expect(queryStringToObject('')).toMatchObject({});
    expect(queryStringToObject(stringQuery)).toMatchObject(queryObj);
  });

  /** randStr */
  it('randStr', () => {
    expect(randStr(10)).toHaveLength(10);
    expect(randStr(1000)).toHaveLength(1000);
  });

  /** copy */
  it('copy', () => {
    expect(copy(queryObj)).toMatchObject(queryObj);
  });

  /** UUID */
  it('UUID', () => {
    expect(UUID()).toHaveLength(36);
  });

  /** safeLowerCaseString */
  it('safeLowerCaseString', () => {
    expect(safeLowerCaseString('qWeRtYuIoP1234  ')).toEqual('qwertyuiop1234  ');
    expect(safeLowerCaseString('')).toEqual('');
  });

  /** debug */
  it('debug', () => {
    process.env = {NODE_ENV: 'development', PUBLIC_URL: ''};
    expect(debug({message: 'test'})).toEqual(undefined);
    expect(debug({message: 'test', optionalParams: ['test']})).toEqual(undefined);
    expect(debug({message: 'test'}, DebugTypes.log)).toEqual(undefined);
    expect(debug({message: 'test'}, DebugTypes.info)).toEqual(undefined);
    expect(debug({message: 'test'}, DebugTypes.warn)).toEqual(undefined);
    expect(debug({message: 'test'}, DebugTypes.error)).toEqual(undefined);
    process.env = {DEBUG: '', PUBLIC_URL: ''};
    expect(debug({message: 'test'})).toEqual(undefined);
    process.env = {DEBUG: 'true', PUBLIC_URL: ''};
    expect(debug({message: 'test'})).toEqual(undefined);
  });
});
