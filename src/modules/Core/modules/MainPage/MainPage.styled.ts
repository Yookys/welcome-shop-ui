import styled from 'styled-components';
import {flex, flexbox, flexDirection} from '@common/styles/mixins';

/**
 * Контейнер
 * @param props - Реквизит
 */
export const MainPageContainer = styled.div`
  ${flexbox};
  ${flexDirection('column')};
  ${flex()};
  background-color: ${({theme}) => theme.color.background.primary};
`;
