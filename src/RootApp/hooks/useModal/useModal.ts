import {Attributes, FunctionComponentElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from '../../../common/utils/commonUtils/commonUtils';
import ModalStackThunk from '../../redux/thunks/modalStackThunk';
import {IObj} from '../../../common/models/commonModel';
import {TModalItem, TModalStackAction, TModalState, TUseModal} from '../../models/modalStackReducerModels';
import {TReducers} from '../../redux/reducers/rootReducer';

/**
 * Хук для работы с модальными окнами
 */
const useModal: TUseModal = () => {
  const dispatch = useDispatch();
  const modalStack: TModalState = useSelector((state: TReducers) => state.modalStack);
  const modal: TModalItem | null = isEmpty(modalStack) ? null : modalStack[modalStack.length - 1];
  const props: Attributes | null = isEmpty(modal) ? null : modal!.props;
  const component: FunctionComponentElement<any> | null = isEmpty(modal) ? null : modal!.component;

  /**
   * Открытие модального окна
   * @param componentModal - Компонент
   * @param propsModal - Реквизит модального окна
   * @param closetWithClickOnWrapper - Закрытие модального окна по клику на подложку
   */
  const openModal = (
    componentModal: FunctionComponentElement<any>,
    propsModal: IObj = {},
    closetWithClickOnWrapper = false
  ) =>
    dispatch<TModalStackAction>(
      ModalStackThunk.openModal({component: componentModal, props: propsModal, closetWithClickOnWrapper})
    );

  /**
   * Изменение модельного окна
   * @param nextProps - Новый реквизит
   * @param key - Порядковый номер
   */
  const editPropsModal = (nextProps: IObj, key: number = modalStack.length - 1) =>
    dispatch<TModalStackAction>(ModalStackThunk.editPropsModal(nextProps, key));

  /**
   * Закрытие последнего модального окна
   */
  const closeLastModal = () => dispatch<TModalStackAction>(ModalStackThunk.closeModal());

  /**
   * Закрытие всех модальных окон
   */
  const closeAllModals = () => dispatch<TModalStackAction>(ModalStackThunk.closeAllModal());

  /**
   * Геттер пропсов модального окна по ключу
   * @param key - Порядковый номер
   */
  const getPropModalByKey = (key: number): IObj => <IObj>modalStack[key].props;

  return {
    modalStack,
    modal,
    props,
    component,
    openModal,
    editPropsModal,
    closeLastModal,
    closeAllModals,
    getPropModalByKey,
  };
};

export default useModal;
