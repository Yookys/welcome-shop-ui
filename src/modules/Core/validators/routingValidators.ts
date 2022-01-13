import {TUser} from '@User/models/serviceModels';
import {isEmpty} from '@common/utils/commonUtils';

/**
 * Валидатор для роутинга в панель упарвления
 * @param user - Пользователь
 */
export const isValidDashboard = (user?: TUser): boolean => !isEmpty(user) && user!.access === 10;
