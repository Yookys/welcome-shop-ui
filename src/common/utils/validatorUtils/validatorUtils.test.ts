import {StringValidator, NumberValidator, DateValidator} from './validatorUtils';

/**
 * Тестирование валидаторов
 */
describe('Validator utils tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  /** StringValidator */
  it('StringValidator', () => {
    expect(StringValidator.isAcceptableRegexp('test tset', /(test)/)).toBeTruthy();
    expect(StringValidator.isAcceptableRegexp('test tset', /(aa)/)).toBeFalsy();
    expect(StringValidator.isLength('test', 4)).toBeTruthy();
    expect(StringValidator.isLength('test', 2)).toBeFalsy();
    expect(StringValidator.isMaxLengthLimit('test', 10)).toBeTruthy();
    expect(StringValidator.isMaxLengthLimit('test', 2)).toBeFalsy();
    expect(StringValidator.isMinLengthLimit('test', 2)).toBeTruthy();
    expect(StringValidator.isMinLengthLimit('test', 5)).toBeFalsy();
    expect(StringValidator.isMinMaxLengthLimit('test', 10, 3)).toBeTruthy();
    expect(StringValidator.isMinMaxLengthLimit('test', 3, 1)).toBeFalsy();
  });

  /** NumberValidator */
  it('NumberValidator', () => {
    expect(NumberValidator.isEmpty(10)).toBeFalsy();
    expect(NumberValidator.isEmpty(undefined)).toBeTruthy();
    expect(NumberValidator.isNan(NaN)).toBeTruthy();
    expect(NumberValidator.isNan(12)).toBeFalsy();
    expect(NumberValidator.isEquals(10, 5)).toBeFalsy();
    expect(NumberValidator.isEquals(12, 12)).toBeTruthy();
    expect(NumberValidator.isMaxLimit(10, 12)).toBeTruthy();
    expect(NumberValidator.isMaxLimit(12, 10)).toBeFalsy();
    expect(NumberValidator.isMinLimit(10, 9)).toBeTruthy();
    expect(NumberValidator.isMinLimit(12, 15)).toBeFalsy();
    expect(NumberValidator.isMinMaxLimit(10, 15, 5)).toBeTruthy();
    expect(NumberValidator.isMinMaxLimit(10, 9, 5)).toBeFalsy();
  });

  /** DateValidator */
  it('DateValidator', () => {
    expect(DateValidator.isValid('1970-01-01')).toBeTruthy();
    expect(DateValidator.isValid('test')).toBeFalsy();
    expect(DateValidator.isBefore('1970-01-01', 'day')).toBeFalsy();
    expect(DateValidator.isBefore('2121-01-01', 'day')).toBeTruthy();
    expect(DateValidator.isEquals('1970-01-01', '1970-02-01')).toBeFalsy();
    expect(DateValidator.isEquals('1970-01-01', '1970-01-01')).toBeTruthy();
    expect(DateValidator.isAfter('1970-01-01', 'day')).toBeTruthy();
    expect(DateValidator.isAfter('2121-01-01', 'day')).toBeFalsy();
  });
});
