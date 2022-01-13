import styled from 'styled-components';

import {alignItems, borderRadius, flex, flexbox, flexDirection, justifyContent} from '@common/styles/mixins';

export const LoginPageContainer = styled.div`
  ${flexbox};
  ${flexDirection('column')};
  ${flex()};
  ${justifyContent('center')};
  ${alignItems('center')};
  margin: 20px 0;
`;

export const LoginPageWrapper = styled.div`
  ${flexbox};
  ${flexDirection('column')};
  ${borderRadius(10)};
  ${({theme}) => theme.shadow.NonClickable};
  background-color: ${({theme}) => theme.color.background.primary};
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;

export const LoginPageHead = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({theme}) => theme.color.background.tertiary};
`;

export const LoginPageError = styled(LoginPageHead)`
  & > p {
    color: ${({theme}) => theme.color.status.danger} !important;
  }
`;

export const LoginPageInputWrapper = styled.div`
  ${flexbox};
  ${justifyContent('center')};
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  & > .ant-btn {
    width: 150px;
  }
`;

export const LoginPageFooter = styled.div`
  ${flexbox};
  ${justifyContent('space-between')};
  padding-top: 20px;
  border-top: 1px solid ${({theme}) => theme.color.background.tertiary};
`;
