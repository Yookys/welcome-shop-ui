import {TReducerUserStore} from '@User/models/userStoreModels';
import {userStoreActions} from '@User/constants/userStoreConst';

/**
 * Редьюсер пользователя
 * @param state - Текущее состояние
 * @param payload - Событие
 */
const userStoreReducer: TReducerUserStore = (state = {}, payload) => {
  switch (payload.type) {
    /** Сеттим пользователя */
    case userStoreActions.setUser:
      if (payload.data.user) {
        return payload.data;
      }
      return state;
    /** Сброс хранилища */
    case userStoreActions.reset:
      return {};
    /** Событие по-умолчанию */
    default:
      return state;
  }
};

export default userStoreReducer;
