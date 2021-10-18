import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader/root';
import Favicon from 'react-favicon';

import {commonPaths} from '@core/constants/pathsConst';
import {ErrorBoundary} from '@common/components/ErrorBoundary/ErrorBoundary';

import store from './redux/store';
import Core from './Core';

/**
 * Входная точка
 */
const CoreEntry: React.FC = () => (
  <React.StrictMode>
    <ErrorBoundary globalError>
      <Provider store={store}>
        <BrowserRouter>
          <Favicon url={commonPaths.favicon} />
          <Core />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

export default hot(CoreEntry);
