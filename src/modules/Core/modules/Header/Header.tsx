import React from 'react';

import {HeaderContainer, HeaderWrapper} from './Header.styled';

/**
 * Шапка
 */
const Header: React.FC = () => (
  <HeaderContainer>
    <HeaderWrapper>Header</HeaderWrapper>
  </HeaderContainer>
);

export default React.memo(Header);
