import styled from 'styled-components';
import {alignItems, flexbox} from '@common/styles/mixins';

/** Контейнер */
export const HeaderUserContainer = styled.div`
  ${flexbox};
  ${alignItems('center')};

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;
