import './ModalStack.scss';
import React, {ReactElement, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useHistory} from 'react-router';

import {isEmpty} from '@common/utils/commonUtils/commonUtils';

import useModal from '../../hooks/useModal/useModal';

export type TModalStackComponent = () => React.ReactPortal;

/**
 * Компонент стека модальных окон.
 */
const ModalStack: TModalStackComponent = () => {
  const {modal, component, props, closeAllModals, closeLastModal} = useModal();
  const history = useHistory();

  /**
   * Закрытие всех модальных окон при изменении роутинга
   */
  useEffect(() => {
    history.listen(() => {
      closeAllModals();
    });
  }, [history]);

  /**
   * Добавляем стили для скрытия скроллингов
   */
  useEffect(() => {
    if (!isEmpty(component)) {
      document.body.classList.add('modal-stack__overflow-wrapper-class');
    } else {
      document.body.classList.remove('modal-stack__overflow-wrapper-class');
    }
  }, [component]);

  /**
   * Остановка передачи события родительским элементам
   * @param event - Событие клика
   */
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (modal && modal.closetWithClickOnWrapper) {
      event.stopPropagation();
    }
  };

  /**
   * Закрываем модальное окно при клике на подложку
   */
  const handleCloseModal = (): void => {
    if (modal && modal.closetWithClickOnWrapper) {
      closeLastModal();
    }
  };

  return (component &&
    ReactDOM.createPortal(
      <div className="modal-stack__wrapper">
        <div className="modal-stack__container" onClick={handleCloseModal}>
          <div className="modal-stack__block" onClick={stopPropagation}>
            <div className="modal-stack">
              {React.cloneElement<ReactElement>(component, {...component.props, ...props})}
            </div>
          </div>
        </div>
      </div>,
      document.body
    )) as React.ReactPortal;
};

export default React.memo(ModalStack);
