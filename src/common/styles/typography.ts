import {css} from 'styled-components';

const FONT_FAMILY = `'Inter', sans-serif`;

type FontSize = {
  12: string;
  14: string;
  16: string;
  18: string;
  22: string;
  28: string;
  32: string;
  36: string;
  42: string;
};

const FONT_SIZE: FontSize = {
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  22: '22px',
  28: '28px',
  32: '32px',
  36: '36px',
  42: '42px',
};

type FontWeight = {
  normal: number;
  medium: number;
  bold: number;
};

const FONT_WEIGHT: FontWeight = {
  normal: 400,
  medium: 500,
  bold: 600,
};

type LineHeight = {
  16: string;
  20: string;
  24: string;
  28: string;
  36: string;
  40: string;
  44: string;
  52: string;
};

const LINE_HEIGHT: LineHeight = {
  16: '16px',
  20: '20px',
  24: '24px',
  28: '28px',
  36: '36px',
  40: '40px',
  44: '44px',
  52: '52px',
};

export type Typography = {
  fontFamily: string;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
};

export const TYPOGRAPHY: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  lineHeight: LINE_HEIGHT,
};

export const typography = {
  MainXXL: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 42px;
    line-height: 52px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  MainXL: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  MainL: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 40px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  MainM: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  MainS: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 28px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  MainXSBold: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  MainXS: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  AdditionalLBold: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  AdditionalL: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  AdditionalM: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  AdditionalS: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  AdditionalSBold: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  AdditionalXS: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  ButtonM: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  ButtonS: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
  CaptionXS: css`
    font-family: ${FONT_FAMILY} !important;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    margin-bottom: 0;
    color: ${(p) => p.theme.color.text.primary};
  `,
} as const;
