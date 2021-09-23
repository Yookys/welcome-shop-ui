import './ResponseError.scss';
import React from 'react';

import {EErrorStatus, ErrorHeadersOfCodes, ErrorTextsOfCodes} from '../../constants/errorConst';
import {isEmpty} from '../../utils/commonUtils/commonUtils';

export type TErrorProps = {
  error: EErrorStatus | null;
};

export type TErrorComponent = (props: TErrorProps) => JSX.Element;

/**
 * Компонент для отрисовки ошибки
 * @param error - Номер ошибка
 */
const ResponseError: TErrorComponent = ({error}) => {
  const errorCode: EErrorStatus = !error ? EErrorStatus._500 : error;
  const errorText: string = isEmpty(ErrorHeadersOfCodes[errorCode])
    ? ErrorHeadersOfCodes[EErrorStatus._500]
    : ErrorHeadersOfCodes[errorCode];
  return (
    <div className="error-component">
      <div className="error-component__container">
        <div className="error-component__icon">
          {/* TODO Добавить изображения */}
          IMAGE
        </div>
        <div className="error-component__label">
          <h3>
            {errorCode} - {errorText}
          </h3>
        </div>
        <div className="error-component__text">
          <h6>{ErrorTextsOfCodes[errorCode]}</h6>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ResponseError);
