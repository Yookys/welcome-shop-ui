import React from 'react';

import ModalStack from './components/ModalStack/ModalStack';
import RootLayout from './layouts/RootLayout';
import {ErrorBoundary} from '../common/components/ErrorBoundary/ErrorBoundary';

export type RootAppComponent = () => JSX.Element;

/**
 * Корневое приложение
 */
const RootApp: RootAppComponent = () => (
  <ErrorBoundary globalError>
    <RootLayout />
    <ModalStack />
  </ErrorBoundary>
);

export default React.memo(RootApp);
