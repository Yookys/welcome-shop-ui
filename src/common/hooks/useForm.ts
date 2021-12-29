import {useCallback, useState} from 'react';
import {isFunction} from 'lodash';

import {isEmpty} from '../utils/commonUtils';
import {IObj} from '../models/commonModel';
import {INextFields, IUseForm} from '../models/formModels';

/**
 * Хук формы
 * @param {Function} validator - Валидатор формы
 * @param {Object} initFields - Начальное состояние формы
 * @param {Object} initErrors - Начальное состояние ошибок
 */
const useForm: IUseForm = <T, K>(
  validator?: (fields: T | IObj) => K | {} | Boolean,
  initFields?: T,
  initErrors?: K
) => {
  const [fields, setFieldsState] = useState<T | IObj>(initFields || {});
  const [errorFields, setErrorFields] = useState<K | IObj>(initErrors || {});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  /**
   * Установка значения
   * @param field - Название
   * @param value - Значение
   */
  const setField = useCallback<(field: string, value: any) => void>(
    (field, value): void => {
      if (!isSubmit) {
        setErrorFields((prevState) => ({...prevState, [field]: undefined}));
        setFieldsState((prevState) => ({...prevState, [field]: value}));
      }
    },
    [fields, errorFields, isSubmit]
  );

  /**
   * Установка значений и ошибок
   * @param nextFields - Значения и ошибки полей: {key: {value, error}}
   */
  const setFields = useCallback<(nextFields: INextFields) => void>(
    (nextFields): void => {
      if (!isSubmit) {
        const fieldsTmp: T | IObj = {...fields};
        const errorsTmp: K | IObj = {...errorFields};
        Object.keys(nextFields).forEach((item) => {
          // @ts-ignore
          fieldsTmp[item] = nextFields[item].value;
          // @ts-ignore
          errorsTmp[item] = isEmpty(nextFields[item].error) ? undefined : nextFields[item].error;
        });
        setFieldsState((prevState) => ({...prevState, ...fieldsTmp}));
        setErrorFields((prevState) => ({...prevState, ...errorsTmp}));
      }
    },
    [fields, errorFields, isSubmit]
  );

  /**
   * Очистка формы
   */
  const clearForm = useCallback<() => void>(() => {
    if (!isSubmit) {
      setFields({});
      setErrorFields({});
    }
  }, [fields, errorFields, isSubmit]);

  /**
   * Очистка формы
   */
  const clearErrors = useCallback<() => void>((): void => {
    if (!isSubmit) {
      setErrorFields({});
    }
  }, [fields, errorFields, isSubmit]);

  /**
   * Установка ошибок
   * @param errors - Объект с ошибками
   */
  const setErrors = useCallback<(errors: IObj) => void>(
    (errors: IObj = {}): void => {
      setIsSubmit(false);
      setErrorFields({...errorFields, ...errors});
    },
    [fields, errorFields, isSubmit]
  );

  /**
   * Валидация и вызов функции отправки
   */
  const isValidForm = useCallback<(silent?: boolean) => boolean>(
    (silent = false) => {
      if (isFunction(validator)) {
        const validateResult: K | {} = validator(fields);
        if (isEmpty(validateResult)) {
          if (!silent) {
            setErrorFields({});
          }
          return true;
        }
        if (!silent) {
          setErrors(validateResult);
        }
        return false;
      }
      return true;
    },
    [fields, errorFields, isSubmit]
  );

  return {
    fields,
    errors: errorFields,
    isSubmit,
    setIsSubmit,
    setField,
    setFields,
    clearForm,
    clearErrors,
    setErrors,
    isValidForm,
  };
};

export default useForm;
