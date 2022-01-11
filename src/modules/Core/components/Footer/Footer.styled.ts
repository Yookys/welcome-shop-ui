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

/** Обёртка для футера */
export const FooterWrapper = styled.div`
  ${flexbox};
  width: 100%;
  min-width: 350px;
  max-width: 1264px;
  padding: 0 10px;
  margin: 0 auto;
`;
