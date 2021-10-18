import './Loader.scss';
import React from 'react';
import cn from 'classnames';
import {LoadingOutlined} from '@ant-design/icons';

export type TLoaderProps = {
  overflow?: boolean;
};

/**
 * Компонент индикатора загрузки
 */
const Loader: React.FC<TLoaderProps> = ({overflow}) => (
  <div className={cn('loader', {'loader--overflow': overflow})}>
    <LoadingOutlined />
  </div>
);

export default React.memo(Loader);
