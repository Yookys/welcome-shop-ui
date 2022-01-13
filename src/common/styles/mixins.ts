import {css} from 'styled-components';

/**
 * Скругление углов
 * @param radius - Радиус скругления
 */
export const borderRadius = (radius: number) => css`
  -webkit-border-radius: ${radius}px;
  -moz-border-radius: ${radius}px;
  -ms-border-radius: ${radius}px;
  border-radius: ${radius}px;
`;

/**
 * Тень блока
 * @param params - Аргументы тени
 */
export const boxShadow = (...params: string[]) => css`
  -webkit-border-radius: ${params};
  -moz-border-radius: ${params};
  -ms-border-radius: ${params};
  border-radius: ${params};
`;

/**
 * Флекс-блок
 */
export const flexbox = css`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
`;

/**
 * Флекс
 * @param fg - fg
 * @param fs - fs
 * @param fb - fb
 */
export const flex = (fg: number = 1, fs: number = 0, fb: string = 'auto') => css`
  -webkit-box: ${fg};
  -moz-box: ${fg};
  -webkit-flex: ${fg} ${fs} ${fb};
  -ms-flex: ${fg} ${fs} ${fb};
  flex: ${fg} ${fs} ${fb};
`;

/**
 * Направление контента во флекс-компоненте
 * @param direction - Направление
 */
export const flexDirection = (direction: 'row' | 'row-reverse' | 'column' | 'column-reverse') => {
  const commonFlexDirection = css`
    -webkit-flex-direction: ${direction};
    -ms-flex-direction: ${direction};
    flex-direction: ${direction};
  `;
  switch (direction) {
    case 'row-reverse':
      return css`
        -webkit-box-direction: reverse;
        -webkit-box-orient: horizontal;
        -moz-box-direction: reverse;
        -moz-box-orient: horizontal;
        ${commonFlexDirection}
      `;
    case 'column':
      return css`
        -webkit-box-direction: normal;
        -webkit-box-orient: vertical;
        -moz-box-direction: normal;
        -moz-box-orient: vertical;
        ${commonFlexDirection}
      `;
    case 'column-reverse':
      return css`
        -webkit-box-direction: reverse;
        -webkit-box-orient: vertical;
        -moz-box-direction: reverse;
        -moz-box-orient: vertical;
        ${commonFlexDirection}
      `;
    default:
      return css`
        -webkit-box-direction: normal;
        -webkit-box-orient: horizontal;
        -moz-box-direction: normal;
        -moz-box-orient: horizontal;
        ${commonFlexDirection}
      `;
  }
};

/**
 * Перенос контента во флексбоксе
 * @param wrap - Перенос
 */
export const flexWrap = (wrap: 'nowrap' | 'wrap' = 'nowrap') => {
  switch (wrap) {
    case 'wrap':
      return css`
        -webkit-flex-wrap: ${wrap};
        -ms-flex-wrap: ${wrap};
        flex-wrap: ${wrap};
      `;
    default:
      return css`
        -webkit-flex-wrap: ${wrap};
        -ms-flex-wrap: nowrap;
        flex-wrap: ${wrap};
      `;
  }
};

/**
 * Расположение контента
 * @param justify - Расположение
 */
export const justifyContent = (
  justify: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center' | string = 'flex-start'
) => {
  const commonJustify = css`
    -webkit-justify-content: ${justify};
    justify-content: ${justify};
  `;
  switch (justify) {
    case 'flex-start':
      return css`
        -webkit-box-pack: start;
        -moz-box-pack: start;
        -ms-flex-pack: start;
        ${commonJustify}
      `;
    case 'flex-end':
      return css`
        -webkit-box-pack: end;
        -moz-box-pack: end;
        -ms-flex-pack: end;
        ${commonJustify}
      `;
    case 'space-between':
      return css`
        -webkit-box-pack: justify;
        -moz-box-pack: justify;
        -ms-flex-pack: justify;
        ${commonJustify}
      `;
    case 'space-around':
      return css`
        -ms-flex-pack: distribute;
        ${commonJustify}
      `;
    default:
      return css`
        -webkit-box-pack: ${justify};
        -moz-box-pack: ${justify};
        -ms-flex-pack: ${justify};
        ${commonJustify}
      `;
  }
};

/**
 * Направление элементов
 * @param align - Направление
 */
export const alignItems = (align: 'stretch' | 'flex-start' | 'flex-end' | 'center' = 'stretch') => {
  const commonAlign = css`
    -webkit-align-items: ${align};
    align-items: ${align};
  `;
  switch (align) {
    case 'flex-start':
      return css`
        -webkit-box-align: start;
        -moz-box-align: start;
        -ms-flex-align: start;
        ${commonAlign}
      `;
    case 'flex-end':
      return css`
        -webkit-box-align: end;
        -moz-box-align: end;
        -ms-flex-align: end;
        ${commonAlign}
      `;
    default:
      return css`
        -webkit-box-align: ${align};
        -moz-box-align: ${align};
        -ms-flex-align: ${align};
        ${commonAlign}
      `;
  }
};
