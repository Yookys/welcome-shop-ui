import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import appConfigReducer from '@Core/redux/reducers/appConfigReducer';
import {IStore} from '@Core/models/storeModels';
import userReducer from '@User/redux/reducers/userReducer';

const store = createStore(
  combineReducers<IStore>({
    /** Конфигурация приложения */
    appConfig: appConfigReducer,
    /** Пользователь */
    user: userReducer,
  }),
  {} as any,
  composeWithDevTools({name: 'WS-UI', trace: true})(applyMiddleware(thunk))
);

export default store;
