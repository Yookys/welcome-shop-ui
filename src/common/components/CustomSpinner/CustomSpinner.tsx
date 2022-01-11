import React from 'react';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import {CustomSpinnerWrapper} from '@common/components/CustomSpinner/CustomSpinner.styled';

/**
 * Кастомный спиннер
 */
const CustomSpinner: React.FC = () => (
  <CustomSpinnerWrapper>
    <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin />} />
  </CustomSpinnerWrapper>
);

export default React.memo(CustomSpinner);
