import {createStore, applyMiddleware, Reducer, CombinedState} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

/**
 * Создание хранилища Redux
 * @param rootReducer - Хранилища Redux
 * @param name - Название хранилища
 */
const createReduxStore = <T>(name: string, rootReducer: Reducer<CombinedState<T>>) =>
  createStore(
    rootReducer,
    {} as any,
    composeWithDevTools({name: `WS-UI__${name}`, trace: true})(applyMiddleware(thunk))
  );

export default createReduxStore;
