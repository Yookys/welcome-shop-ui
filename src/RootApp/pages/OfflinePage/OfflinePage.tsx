import './OfflinePage.scss';
import React from 'react';
import {InfoCircleOutlined} from '@ant-design/icons';

export type TOfflinePage = () => JSX.Element;

/**
 * Страница для отображение системы в режиме Offline
 */
const OfflinePage: TOfflinePage = () => (
  <div className="offline-page">
    <div className="offline-page__container">
      <InfoCircleOutlined />
      <h1>Ресурс временно недоступен</h1>
      <p>Ведутся технические работы. Приносим свои извинения за неудобство.</p>
    </div>
  </div>
);

export default OfflinePage;
