import React from 'react';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';

import {IObj} from '@common/models/commonModel';

import useModal from './useModal';
import {TUseModalReturned} from '../../models/modalStackReducerModels';
import store from '../../redux/store';

/** Запуск хука */
const setUp = (): TUseModalReturned => {
  const returnVal: TUseModalReturned | {} = {};
  function TestComponent() {
    Object.assign(returnVal, useModal());
    return null;
  }
  render(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
  // @ts-ignore
  return returnVal;
};

describe('useGlobalError tests', () => {
  /** Компонент */
  // eslint-disable-next-line @typescript-eslint/no-shadow
  let useModal: TUseModalReturned | IObj = {};

  /** Инициализация компонента */
  beforeEach(() => {
    useModal = setUp();
  });

  /** Корректный вызов хука */
  it('useModal success call', () => {
    expect(useModal.modalStack).toHaveLength(0);
    expect(useModal.modal).toBe(null);
    expect(useModal.props).toBe(null);
    expect(useModal.component).toBe(null);
  });

  /** Добавление */
  it('useModal add modal', () => {
    useModal.openModal(<div>Test</div>);
    expect(useModal.modalStack).toHaveLength(1);
    useModal.openModal(<div>Test</div>, undefined, true);
    expect(useModal.modalStack).toHaveLength(2);
    useModal.openModal(<div>Test</div>, {title: 'testAnyProps'}, true);
    expect(useModal.modalStack).toHaveLength(3);
    expect(useModal.modal).toBeDefined();
    expect(useModal.props).toBeDefined();
    expect(useModal.component).toBeDefined();
  });

  /** Закрытие */
  it('useModal close modals', () => {
    expect(useModal.modalStack).toHaveLength(3);
    useModal.closeLastModal();
    expect(useModal.modalStack).toHaveLength(2);
    useModal.closeAllModals();
    expect(useModal.modalStack).toHaveLength(0);
  });

  /** Работа с пропсами */
  it('useModal edit props', () => {
    useModal.openModal(<div title="test">Test</div>, {title: 'testAnyProps'});
    expect(useModal.props).toEqual({title: 'testAnyProps'});
    useModal.editPropsModal({title: 'testAnyPropsChange'});
    expect(useModal.props).toEqual({title: 'testAnyPropsChange'});
    useModal.editPropsModal({title: 'testAnyPropsChangeByKey'}, 0);
    expect(useModal.getPropModalByKey(0)).toEqual({title: 'testAnyPropsChangeByKey'});
  });
});
