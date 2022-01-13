import {TUser} from '@User/models/serviceModels';
import {isEmpty} from '@common/utils/commonUtils';

/**
 * Валидатор для роутинга страниц, требующих авторизации
 * @param user - Пользователь
 */
export const isValidWithLogin = (user?: TUser): boolean => !isEmpty(user);

/**
 * Валидатор для роутинга страниц, НЕ требующих авторизации
 * @param user - Пользователь
 */
export const isValidWithoutLogin = (user?: TUser): boolean => isEmpty(user);
