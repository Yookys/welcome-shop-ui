import './common/styles/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import initApp from './common/utils/initAppUtil';
import RootAppEntry from './RootApp/RootAppEntry';

initApp(<RootAppEntry />);
