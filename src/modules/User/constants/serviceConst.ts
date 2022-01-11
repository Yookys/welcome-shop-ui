/** Перечень методов API пользолвателей */
export enum EUserApiMethods {
  login = 'login',
  jwtLogin = 'jwtLogin',
  logout = 'logout',
  registration = 'registration',
}

/** Методы МКС пользователей */
export const userRestMethods: Record<EUserApiMethods, string> = {
  [EUserApiMethods.login]: '/login',
  [EUserApiMethods.jwtLogin]: '/login/jwt',
  [EUserApiMethods.logout]: '/logout',
  [EUserApiMethods.registration]: '/registration',
};
