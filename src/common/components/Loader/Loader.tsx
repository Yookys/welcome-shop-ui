import './Loader.scss';
import React from 'react';
import cn from 'classnames';

export type TLoaderProps = {
  overflow?: boolean;
};

export type TLoaderComponent = (props: TLoaderProps) => JSX.Element;

/**
 * Компонент индикатора загрузки
 */
const Loader: TLoaderComponent = ({overflow}) => (
  <div className={cn('loader', {'loader--overflow': overflow})}>Загрузка.</div>
);

export default React.memo(Loader);
