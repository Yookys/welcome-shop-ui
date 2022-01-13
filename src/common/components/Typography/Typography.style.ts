import styled, {css} from 'styled-components';

import {typography} from '@common/styles/typography';

import {TTypographyColor, TTypographySize} from './Typography';

export const TypographyTagH1 = styled.h1<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.MainXXL};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;

export const TypographyTagH2 = styled.h2<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.MainXL};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;

export const TypographyTagH3 = styled.h3<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.MainL};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;

export const TypographyTagH4 = styled.h4<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.MainM};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;

export const TypographyTagH5 = styled.h5<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.MainS};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;

export const TypographyTagH6 = styled.h6<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.MainXS};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;

export const TypographyTagH6Bold = styled.h6<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.MainXSBold};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;

export const TypographyTagP = styled.p<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.AdditionalL};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;

export const TypographyTagSpan = styled.span<{color?: TTypographyColor; size?: TTypographySize}>`
  ${typography.AdditionalL};
  ${({size}) => size && typography[size]}
  ${({color, theme}) =>
    color &&
    css`
      color: ${theme.color.text[color]};
    `}
`;
