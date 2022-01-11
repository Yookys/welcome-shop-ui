import React from 'react';
import {Link} from 'react-router-dom';

import logo from '@assets/images/logo.jpg';
import HeaderUser from '@User/components/HeaderUser/HeaderUser';
import CatalogSearch from '@Catalog/components/CatalogSearch/CatalogSearch';

import {HeaderContainer, HeaderWrapper, Logo} from './Header.styled';

/**
 * Шапка
 */
const Header: React.FC = () => (
  <HeaderContainer>
    <HeaderWrapper>
      <Link to="/">
        <Logo src={logo} alt={logo} />
      </Link>
      <CatalogSearch />
      <HeaderUser />
    </HeaderWrapper>
  </HeaderContainer>
);

export default React.memo(Header);
