import React from 'react';
import {render} from '@testing-library/react';

import useForm from './useForm';
import {IObj} from '../../models/commonModel';
import {TUseFormReturned} from '../../models/formModels';

type TTestForm = {test: string};

/** Запуск хука */
const setUp = <T extends IObj = any, K extends IObj = any>(
  validator?: (fields: T | IObj) => K | {} | Boolean,
  initFields?: T,
  initErrors?: K
): TUseFormReturned<T, K> => {
  const returnVal: TUseFormReturned<T, K> | {} = {};
  function TestComponent() {
    Object.assign(returnVal, useForm<T, K>(validator, initFields, initErrors));
    return null;
  }
  render(<TestComponent />);
  // @ts-ignore
  return returnVal;
};

describe('useForm tests', () => {
  /** Компонент */
  let hookForm: TUseFormReturned<TTestForm, TTestForm>;

  /** Инициализация компонента */
  beforeEach(() => {
    hookForm = setUp<TTestForm, TTestForm>(() => ({}), {test: 'test'});
  });

  /** Корректный вызов хука */
  it('useForm success call', () => {
    expect(hookForm.fields.test).toBe('test');
  });

  /** Корректный вызов setField */
  it('useForm setField', () => {
    hookForm.setField('test', 'value');
    expect(hookForm.fields.test).toBe('value');
    hookForm = setUp<TTestForm, TTestForm>(() => ({test: 'error'}), {test: 'test'});
    hookForm.setField('test', '');
    expect(hookForm.isValidForm()).toBeFalsy();
  });

  /** Корректный вызов setFields */
  it('useForm setFields', () => {
    hookForm.setFields({test: {value: 'value', error: 'error'}});
    expect(hookForm.fields.test).toBe('value');
    expect(hookForm.errors.test).toBe('error');
    hookForm.setFields({test: {value: 'value'}});
    expect(hookForm.fields.test).toBe('value');
    expect(hookForm.errors.test).toBe(undefined);
  });

  /** Корректный вызов clearForm */
  it('useForm clearForm', () => {
    hookForm.clearForm();
    expect(hookForm.fields).toMatchObject({});
    expect(hookForm.errors).toMatchObject({});
  });

  /** Корректный вызов clearErrors */
  it('useForm clearErrors', () => {
    hookForm.clearErrors();
    expect(hookForm.errors).toMatchObject({});
  });

  /** Корректный вызов setErrors */
  it('useForm setErrors', () => {
    hookForm.setErrors({test: 'jwtTest'});
    expect(hookForm.errors.test).toBe('jwtTest');
  });

  /** Корректный вызов isValidForm */
  it('useForm isValidForm', () => {
    expect(hookForm.isValidForm()).toBeTruthy();
    hookForm = setUp<TTestForm, TTestForm>(() => false, {test: ''});
    hookForm.clearForm();
    expect(hookForm.isValidForm()).toBeFalsy();
    hookForm = setUp<TTestForm, TTestForm>();
    hookForm.clearForm();
    expect(hookForm.isValidForm()).toBeTruthy();
  });
});
