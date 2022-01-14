import styled from 'styled-components';
import {alignItems, flex, flexbox, justifyContent} from '@common/styles/mixins';

/**
 * Обёртка для кастомного спиннера
 */
export const CustomSpinnerWrapper = styled.div`
  ${flexbox};
  ${flex()};
  ${alignItems('center')};
  ${justifyContent('center')};
  min-height: 100%;
`;
