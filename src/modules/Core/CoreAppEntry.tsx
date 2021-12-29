import 'core-js/stable';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'antd/dist/antd.css';

import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Favicon from 'react-favicon';
import {ThemeProvider} from 'styled-components';

import {FontsInter} from '@common/styles/FontsInter';
import {ResetStyles} from '@common/styles/ResetStyles';
import {THEME} from '@common/styles/theme/theme';
import CoreApp from '@Core/CoreApp';

/**
 * Ядро - входная точка UI
 */
const CoreAppEntry: React.FC = () => (
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <ResetStyles />
        <FontsInter />
        <Favicon url="/favicon.svg" />
        <CoreApp />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export default React.memo(CoreAppEntry);
