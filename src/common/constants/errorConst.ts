/**
 * Статусы ошибок
 */
export enum EErrorStatus {
  _400 = 400,
  _401 = 401,
  _403 = 403,
  _404 = 404,
  _500 = 500,
  _503 = 403,
}

/**
 * Перечень заголовков ошибок
 */
export const ErrorHeadersOfCodes: Record<EErrorStatus, string> = {
  [EErrorStatus._400]: 'Функционал не выполняется',
  [EErrorStatus._401]: 'Ошибка авторизации',
  [EErrorStatus._403]: 'Доступ к функционалу ограничен',
  [EErrorStatus._404]: 'Страница не найдена',
  [EErrorStatus._500]: 'На сервере возникла ошибка',
  [EErrorStatus._503]: 'Время ожидания от сервера истекло',
};

/**
 * Перечень текстов ошибок
 */
export const ErrorTextsOfCodes: Record<EErrorStatus, string | undefined> = {
  [EErrorStatus._400]: undefined,
  [EErrorStatus._401]: 'Вам нужно авторизоваться для получения доступа к странице',
  [EErrorStatus._403]: 'У вас не достаточно прав.',
  [EErrorStatus._404]: 'Ошибка на сервере. Для получения информации, обратитесь к администрации магазина.',
  [EErrorStatus._500]: 'Функционал не выполняется. Ошибка на сервере. Попробуйте обновить страницу.',
  [EErrorStatus._503]: 'Функционал временно недоступен. ',
};
