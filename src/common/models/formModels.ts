import {IObj} from './commonModel';

export interface INextFields {
  [key: string]: {
    value: any;
    error?: string;
  };
}

export type TUseFormReturned<T, K> = {
  fields: T | IObj;
  errors: K | IObj;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  setField: (field: string, value: string | number | boolean | IObj | null | undefined) => void;
  setFields: (nextFields: INextFields) => void;
  clearForm: () => void;
  clearErrors: () => void;
  setErrors: (errors: IObj) => void;
  isValidForm: (silent?: boolean) => boolean;
};

export type IUseForm = <T extends IObj, K extends IObj>(
  validator?: (fields: T | IObj) => K | {} | Boolean,
  initFields?: T,
  initErrors?: K
) => TUseFormReturned<T, K>;
