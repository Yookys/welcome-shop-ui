/** Ключ редьюсера */
export const userStoreAdditionalKey = '[user]';

/** Ключ для JWT в localStorage */
export const userJwtLocalStorageKey = `${userStoreAdditionalKey} jwt`;

/** Перечень событий в редьюсере */
export const userStoreActions = {
  setUser: `${userStoreAdditionalKey} set_user`,
  reset: `${userStoreAdditionalKey} reset`,
} as const;
