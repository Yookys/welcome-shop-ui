import styled from 'styled-components';
import {flex, flexbox, flexDirection} from '@common/styles/mixins';

/**
 * Контейнер приложения
 * @param props - Реквизиты
 */
export const CoreAppContainer = styled.div`
  ${flexbox};
  ${flexDirection('column')};
  ${flex(1)};
  position: relative;
  background-color: ${({theme}) => theme.color.background.secondary};
`;

/**
 * Враппер контента
 * @param props - Реквизиты
 */
export const CoreAppContentWrapper = styled.div`
  ${flexbox};
  ${flexDirection('column')};
  ${flex(1)};
  width: 100%;
  min-width: 350px;
  max-width: 1264px;
  padding: 0 10px;
  margin: 0 auto;
`;
