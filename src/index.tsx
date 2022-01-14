import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';

import CustomSpinner from '@common/components/CustomSpinner/CustomSpinner';

const CoreAppEntry = React.lazy(() => import('@Core/CoreAppEntry'));

ReactDOM.render(
  <Suspense fallback={<CustomSpinner />}>
    <CoreAppEntry />
  </Suspense>,
  document.getElementById('root')
);
