import './ErrorWrapper.scss';
import React, {ErrorInfo} from 'react';

import Logo from '../../assets/img/logo_full_vertical_short.svg';

export type TErrorWrapperProps = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

/**
 * Компонент для отображения глобальной ошибки в ErrorBoundary
 * @param error - Ошибка
 * @param errorInfo - Информация об ошибке
 */
const ErrorWrapper: React.FC<TErrorWrapperProps> = ({error, errorInfo}) => (
  <div className="error-wrapper">
    <div className="error-wrapper__logo">
      <Logo />
    </div>
    <div className="error-wrapper__container">
      <h3 className="error-wrapper__title">
        Что-то пошло не так... <b>({error?.name})</b>
      </h3>
      <div className="error-wrapper__info">
        <b className="error-wrapper__red">
          <u>StackTrace</u>: {errorInfo?.componentStack}
        </b>
        <br />
        <br />
        {error?.stack
          ?.replaceAll(')', ' -')
          .split('(')
          .map((item, key) => (
            <>
              {key === 0 ? <u>{item}</u> : item}
              <br />
              <br />
            </>
          ))}
      </div>
    </div>
  </div>
);

export default React.memo(ErrorWrapper);
