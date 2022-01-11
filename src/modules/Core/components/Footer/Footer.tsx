import React from 'react';

import {FooterContainer, FooterWrapper} from './Footer.styled';

/**
 * Подвал
 */
const Footer: React.FC = () => (
  <FooterContainer>
    <FooterWrapper>Footer</FooterWrapper>
  </FooterContainer>
);

export default React.memo(Footer);
