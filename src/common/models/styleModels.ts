export type Basic = {
  primary: string;
  secondary: string;
  tertiary: string;
  hover: string;
  press: string;
  disable: string;
  primaryLight: string;
};

export type Background = {
  primary: string;
  secondary: string;
  tertiary: string;
  tertiaryHover: string;
  card: string;
  cardHover: string;
  inversion: string;
  shadow: string;
  header: string;
  surfaceDanger: string;
  surfaceWarn: string;
  surfaceSuccess: string;
};

export type Text = {
  primary: string;
  secondary: string;
  tertiary: string;
  inversion: string;
  staticWhite: string;
  staticBlack: string;
};

export type Status = {
  warn: string;
  hoverWarn: string;
  pressWarn: string;
  success: string;
  hoverSuccess: string;
  pressSuccess: string;
  danger: string;
  hoverDanger: string;
  pressDanger: string;
};

export type Special = {
  blue: string;
  softBlue: string;
  lightBlue: string;
  softLightBlue: string;
  turquoise: string;
  softTurquoise: string;
  green: string;
  softGreen: string;
  yellow: string;
  softYellow: string;
  red: string;
  softRed: string;
  magenta: string;
  softMagenta: string;
  purple: string;
  softPurple: string;
  violet: string;
  softViolet: string;
  gray: string;
  softGray: string;
  blueDark: string;
};

export type Color = {
  basic: Basic;
  background: Background;
  text: Text;
  status: Status;
  special: Special;
};

export interface Shadow {
  ClickableActive: string;
  ClickableDefault: string;
  ClickableHover: string;
  NonClickable: string;
}

export interface ZIndex {
  spinner: number;
  tooltip: number;
  notification: number;
  hint: number;
  modal: number;
  dropdown: number;
}

export interface Theme {
  color: Color;
  shadow: Shadow;
  zIndex: ZIndex;
  name: 'light' | 'dark';
}
