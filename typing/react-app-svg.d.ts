/// <reference types="react-scripts" />
import * as React from 'react';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}
