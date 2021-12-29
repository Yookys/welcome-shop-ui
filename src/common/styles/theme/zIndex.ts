import {ZIndex} from '@common/models/styleModels';

const Z_INDEX_BASE_NUMBER = 100;

export const zIndex: ZIndex = {
  spinner: Z_INDEX_BASE_NUMBER,
  tooltip: Z_INDEX_BASE_NUMBER,
  notification: Z_INDEX_BASE_NUMBER - 1,
  hint: Z_INDEX_BASE_NUMBER - 2,
  dropdown: Z_INDEX_BASE_NUMBER - 3,
  modal: Z_INDEX_BASE_NUMBER - 4,
};
