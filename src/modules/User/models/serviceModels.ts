/** Модель пользователя */
export type TUser = {
  id: string;
  login: string;
  email: string;
  phone: string;
  address: string;
  access: number;
  jwt: string;
};

/** Модель тела запроса для авторизации */
export type TLoginBody = {
  login: string;
  password: string;
};

/** Модель тела запроса для регистрации */
export type TRegistrationBody = {
  login: string;
  password: string;
  email: string;
};
