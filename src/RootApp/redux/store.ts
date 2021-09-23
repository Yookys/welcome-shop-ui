import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import rootReducer from './reducers/rootReducer';

const storeSupport = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(createBrowserHistory())))
);

export default storeSupport;
