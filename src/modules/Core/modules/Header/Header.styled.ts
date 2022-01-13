import styled from 'styled-components';
import {alignItems, flexbox, justifyContent} from '@common/styles/mixins';

/**
 * Контейнер шапки
 * @param props - Реквизиты
 */
export const HeaderContainer = styled.header`
  ${flexbox};
  height: 60px;
  width: 100%;
  background-color: ${({theme}) => theme.color.background.primary};
  ${({theme}) => theme.shadow.NonClickable};
  z-index: 1;
`;

export const HeaderWrapper = styled.div`
  ${flexbox};
  ${justifyContent('space-between')};
  ${alignItems('center')};
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

export const Logo = styled.img`
  @media ${({theme}) => theme.media.desktop} {
    height: 55px;
  }

  @media ${({theme}) => theme.media.phone} {
    height: 40px;
  }
`;
