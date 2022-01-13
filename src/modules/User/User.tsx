import React from 'react';

import WithLoggedLayout from '@User/layouts/UserLayout';

/**
 * Входная точка модуля User
 */
const User: React.FC = () => <WithLoggedLayout />;

export default React.memo(User);
