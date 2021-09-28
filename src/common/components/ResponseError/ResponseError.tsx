import './ResponseError.scss';
import React from 'react';
import {WarningOutlined} from '@ant-design/icons';

import {EErrorStatus, ErrorHeadersOfCodes, ErrorTextsOfCodes} from '../../constants/errorConst';

export type TErrorProps = {
  status?: EErrorStatus;
};

export type TErrorComponent = (props: TErrorProps) => JSX.Element;

/**
 * Компонент для отрисовки ошибки
 * @param error - Номер ошибка
 */
const ResponseError: TErrorComponent = ({status = EErrorStatus._500}) => (
  <div className="error-component">
    <div className="error-component__container">
      <div className="error-component__icon">
        <WarningOutlined />
      </div>
      <div className="error-component__label">
        <h3 className="font-main-xl">
          {status} - {ErrorHeadersOfCodes[status]}
        </h3>
      </div>
      <div className="error-component__text">
        <p className="font-main-xs">{ErrorTextsOfCodes[status]}</p>
      </div>
    </div>
  </div>
);

export default React.memo(ResponseError);
