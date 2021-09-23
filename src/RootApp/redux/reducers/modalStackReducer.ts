import {EModalStackActions} from '../../constants/reducersConst';
import {TModalStackReducer} from '../../models/modalStackReducerModels';

/**
 * Редьюсер для стека модальных окон
 */
const modalStackReducer: TModalStackReducer = (state = [], payload) => {
  switch (payload.type) {
    /** Открытие модального окна */
    case EModalStackActions.MODAL_STACK_OPEN:
      if (payload.data) {
        return [...state, payload.data];
      }
      return state;
    /** Закрытие последнего модального окна */
    case EModalStackActions.MODAL_STACK_CLOSE: {
      const modalStackTmp = [...state];
      modalStackTmp.pop();
      return modalStackTmp;
    }
    /** Закрытие всех модальных окон */
    case EModalStackActions.MODAL_STACK_CLOSE_ALL:
      return [];
    /** Обновление пропсов для модального окна */
    case EModalStackActions.MODAL_STACK_EDIT_PROPS: {
      const modalTmp = [...state];
      if (payload.props) {
        modalTmp[payload.key || modalTmp.length - 1].props = payload.props;
      }
      return [...modalTmp];
    }
    default:
      return state;
  }
};

export default modalStackReducer;
