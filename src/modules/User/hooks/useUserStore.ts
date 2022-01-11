import {useDispatch, useSelector} from 'react-redux';

import {TUseUserStore, TUseUserStoreReducer} from '@User/models/userStoreModels';
import userStoreThunk from '@User/redux/thunks/appConfigThunk';
import {TUser} from '@User/models/serviceModels';

/**
 * Хук для взаимодействия с хранилищем пользователя
 */
const useUserStore = (): TUseUserStore => {
  /** Используем хранилище конфигурации приложения */
  const {user} = useSelector((state: TUseUserStoreReducer) => state.user);
  /** Используем триггер асинхронных событий */
  const dispatch = useDispatch();
  /** Деструкторизация асинхронных функций (Thunk`s) */
  const {setUser, resetUserStore} = userStoreThunk;

  /**
   * Сеттер пользователя
   * @param nextUser - Пользователь
   */
  const onSetUser = (nextUser: TUser) => dispatch(setUser(nextUser));

  /**
   * Сброс хранилища
   */
  const onResetUserStore = () => dispatch(resetUserStore);

  return {
    user,
    onSetUser,
    onResetUserStore,
  };
};

export default useUserStore;
