import {TModule} from '@common/models/modulesModels';
import MainPage from '@core/modules/MainPage/MainPage';
import OfflinePage from '@core/modules/OfflinePage/OfflinePage';
import {EModulesAccess} from '@common/constants/modulesConst';

/** Описание модулей для online */
export const modulesOnlineList: TModule[] = [
  {
    path: '/',
    exact: true,
    access: EModulesAccess.all,
    entry: MainPage,
  },
];

/** Описание модулей для offline */
export const modulesOfflineList: TModule[] = [
  {
    path: '/',
    exact: true,
    access: EModulesAccess.all,
    entry: OfflinePage,
  },
];
