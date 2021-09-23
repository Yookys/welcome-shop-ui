import {EModalStackActions} from '../../constants/reducersConst';
import {TModalStackThunk} from '../../models/modalStackReducerModels';

/**
 * Асинхронные события для хранилища стека модальных окон
 */
const modalStackThunk: TModalStackThunk = {
  /**
   * Открытие модального окна
   * @param modal - Модальное окно
   */
  openModal: (modal) => (dispatch) =>
    dispatch({type: EModalStackActions.MODAL_STACK_OPEN, data: modal, key: null, props: null}),
  /**
   * Закрытие последнего модального окна
   */
  closeModal: () => (dispatch) =>
    dispatch({type: EModalStackActions.MODAL_STACK_CLOSE, data: null, key: null, props: null}),
  /**
   * Закрытие всех модальных окон
   */
  closeAllModal: () => (dispatch) =>
    dispatch({type: EModalStackActions.MODAL_STACK_CLOSE_ALL, data: null, key: null, props: null}),
  /**
   * Изменение пропсов модального окна
   * @param props - пропсы модального окна
   * @param key - Порядковый номер модального окна
   */
  editPropsModal: (props, key) => (dispatch) => {
    dispatch({type: EModalStackActions.MODAL_STACK_EDIT_PROPS, data: null, key, props});
  },
};

export default modalStackThunk;
