/** Перечень возможных событий для стека модальных окон */
export enum EModalStackActions {
  MODAL_STACK_OPEN = '[MODAL_STACK] OPEN',
  MODAL_STACK_CLOSE = '[MODAL_STACK] CLOSE',
  MODAL_STACK_CLOSE_ALL = '[MODAL_STACK] CLOSE_ALL',
  MODAL_STACK_EDIT_PROPS = '[MODAL_STACK] EDIT_PROPS',
}

/** Перечень возможных событий в хранилище параметров */
export enum ESettingActions {
  SETTING_SET = '[SETTING] SET',
}
