import React, {Suspense} from 'react';

import CustomSpinner from '@common/components/CustomSpinner/CustomSpinner';

const WithLoggedLayout = React.lazy(() => import('@User/layouts/UserLayout'));

/**
 * Входная точка модуля User
 */
const User: React.FC = () => (
  <Suspense fallback={<CustomSpinner />}>
    <WithLoggedLayout />
  </Suspense>
);

export default React.memo(User);
