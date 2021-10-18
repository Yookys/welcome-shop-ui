import './LoadContentWrapper.scss';
import React from 'react';

import Loader from '../Loader/Loader';
import {isEmpty} from '../../utils/commonUtils/commonUtils';

export type TLoadedContentWrapperProps = {
  isLoading: boolean;
  overflowLoading?: (loader: JSX.Element) => JSX.Element;
  isError?: boolean;
  getError?: () => JSX.Element;
  errorWrapper?: (error: JSX.Element) => JSX.Element;
  children: any;
};

/**
 * Обёртка для загружаемого контента
 * @param isLoading - Идёт ли загрузка
 * @param overflowLoading - Функция обёртки загрузчика
 * @param isError - Произошла ли ошибка
 * @param getError - Геттер ошибки
 * @param errorWrapper - Обёртка для ошибки
 * @param children - Вложенность
 */
const LoadedContentWrapper: React.FC<TLoadedContentWrapperProps> = ({
  isLoading,
  overflowLoading,
  isError,
  getError,
  errorWrapper,
  children,
}) => {
  /**
   * Обработка ошибки
   */
  if (isError && getError) {
    if (errorWrapper && !isEmpty(errorWrapper)) {
      return errorWrapper(getError());
    }
    return getError();
  }

  /**
   * Обработка загрузчика
   */
  if (isLoading) {
    if (overflowLoading && !isEmpty(overflowLoading)) {
      return overflowLoading(<Loader />);
    }
    return <Loader />;
  }

  return children;
};

export default React.memo(LoadedContentWrapper);
