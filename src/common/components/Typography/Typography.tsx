import React from 'react';

import {
  TypographyTagH1,
  TypographyTagH2,
  TypographyTagH3,
  TypographyTagH4,
  TypographyTagH5,
  TypographyTagH6,
  TypographyTagH6Bold,
  TypographyTagP,
  TypographyTagSpan,
} from '@common/components/Typography/Typography.style';

export const typographyTag = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  h6Bold: 'h6Bold',
  p: 'p',
  span: 'span',
};

export const typographyColor = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  inversion: 'inversion',
  staticWhite: 'staticWhite',
  staticBlack: 'staticBlack',
};

/** Размеры шрифтов */
export const typographySize = {
  MainXXL: 'MainXXL',
  MainXL: 'MainXL',
  MainL: 'MainL',
  MainM: 'MainM',
  MainS: 'MainS',
  MainXSBold: 'MainXSBold',
  MainXS: 'MainXS',
  AdditionalLBold: 'AdditionalLBold',
  AdditionalL: 'AdditionalL',
  AdditionalM: 'AdditionalM',
  AdditionalS: 'AdditionalS',
  AdditionalSBold: 'AdditionalSBold',
  AdditionalXS: 'AdditionalXS',
  ButtonS: 'ButtonS',
  ButtonM: 'ButtonM',
  CaptionXS: 'CaptionXS',
} as const;

/** Тип размеров шрифтов */
export type TTypographyTag = typeof typographyTag[keyof typeof typographyTag];

/** Тип размеров шрифтов */
export type TTypographyColor = typeof typographyColor[keyof typeof typographyColor];

/** Тип размеров шрифтов */
export type TTypographySize = typeof typographySize[keyof typeof typographySize];

/** Тип пропсов */
export type TTypographyProps = {
  children: React.ReactNode;
  tag?: TTypographyTag;
  color?: TTypographyColor;
  size?: TTypographySize;
};

/**
 * Типографика
 * @param children - Наполнение
 * @param tag - Тэг
 * @param color - Цвет
 * @param size - Размер
 */
const Typography: React.FC<TTypographyProps> = ({children, tag, color, size}) => {
  switch (tag) {
    case typographyTag.h1:
      return (
        <TypographyTagH1 color={color} size={size}>
          {children}
        </TypographyTagH1>
      );
    case typographyTag.h2:
      return (
        <TypographyTagH2 color={color} size={size}>
          {children}
        </TypographyTagH2>
      );
    case typographyTag.h3:
      return (
        <TypographyTagH3 color={color} size={size}>
          {children}
        </TypographyTagH3>
      );
    case typographyTag.h4:
      return (
        <TypographyTagH4 color={color} size={size}>
          {children}
        </TypographyTagH4>
      );
    case typographyTag.h5:
      return (
        <TypographyTagH5 color={color} size={size}>
          {children}
        </TypographyTagH5>
      );
    case typographyTag.h6:
      return (
        <TypographyTagH6 color={color} size={size}>
          {children}
        </TypographyTagH6>
      );
    case typographyTag.h6Bold:
      return (
        <TypographyTagH6Bold color={color} size={size}>
          {children}
        </TypographyTagH6Bold>
      );
    case typographyTag.span:
      return (
        <TypographyTagSpan color={color} size={size}>
          {children}
        </TypographyTagSpan>
      );
    default:
      return (
        <TypographyTagP color={color} size={size}>
          {children}
        </TypographyTagP>
      );
  }
};

export default React.memo(Typography);
