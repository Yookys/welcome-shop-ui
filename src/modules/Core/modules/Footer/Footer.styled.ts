import styled from 'styled-components';

import {flexbox} from '@common/styles/mixins';

/**
 * Контейнер
 * @param props - Реквизиты
 */
export const FooterContainer = styled.div`
  ${flexbox};
  width: 100%;
  background-color: ${({theme}) => theme.color.background.primary};
  ${({theme}) => theme.shadow.NonClickable};
`;

/**
 * Обёртка для футера
 * @param props - Реквизиты
 */
export const FooterWrapper = styled.div`
  ${flexbox};
  width: 100%;
  min-width: 350px;
  max-width: 1264px;
  margin: 0 auto;

  @media ${({theme}) => theme.media.desktop} {
    padding: 0 20px;
  }

  @media ${({theme}) => theme.media.phone} {
    padding: 0 10px;
  }
`;
