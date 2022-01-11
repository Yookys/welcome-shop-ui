import styled from 'styled-components';
import {flexbox} from '@common/styles/mixins';

/**
 * Контейнер шапки
 * @param props - Реквизиты
 */
export const HeaderContainer = styled.header`
  ${flexbox};
  height: 60px;
  width: 100%;
  background-color: ${({theme}) => theme.color.background.secondary};
  ${({theme}) => theme.shadow.NonClickable};
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  min-width: 350px;
  max-width: 1264px;
  margin: 0 auto;
`;
