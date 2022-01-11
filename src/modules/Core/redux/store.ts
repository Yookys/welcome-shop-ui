import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import appConfigReducer from "@Core/redux/reducers/appConfigReducer";
import {IStore} from "@Core/models/storeModels";

const store = createStore(
    combineReducers<IStore>({
      /** Конфигурация приложения */
      appConfig: appConfigReducer,
    }),
    {} as any,
    composeWithDevTools({name: 'WS-UI', trace: true})(applyMiddleware(thunk))
);

export default store;
