import {TThunksUserStore} from '@User/models/userStoreModels';
import {userStoreActions} from '@User/constants/userStoreConst';

/**
 * Асинхронные события для хранилища пользователя
 */
const userStoreThunk: TThunksUserStore = {
  /**
   * Сеттер пользователя
   * @param user - Пользователь
   */
  setUser: (user) => (dispatch) => dispatch({type: userStoreActions.setUser, data: {user}}),
  /**
   * Сброс хранилища
   * @param dispatch - Триггер асинхронного события
   */
  resetUserStore: (dispatch) => dispatch({type: userStoreActions.reset, data: {}}),
};

export default userStoreThunk;
