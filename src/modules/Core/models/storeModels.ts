import {TReducerAppConfig} from '@Core/models/appConfigModels';
import {TReducerUserStore} from '@User/models/userStoreModels';

/** Модель хранилища */
export interface IStore extends TReducerAppConfig, TReducerUserStore {}
