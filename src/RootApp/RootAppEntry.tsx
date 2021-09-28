import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader/root';
import Favicon from 'react-favicon';

import store from './redux/store';
import RootApp from './RootApp';
import {ErrorBoundary} from '../common/components/ErrorBoundary/ErrorBoundary';

export type RootAppEntryComponent = () => JSX.Element;

/**
 * Входная точка
 */
const RootAppEntry: RootAppEntryComponent = () => (
  <React.StrictMode>
    <ErrorBoundary globalError>
      <Provider store={store}>
        <BrowserRouter>
          <Favicon url="/static/media/favicon.svg" />
          <RootApp />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

export default hot(RootAppEntry);
