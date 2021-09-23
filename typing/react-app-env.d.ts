/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production';
    CONFIG?: 'development' | 'prom';
    VERSION?: string;
  }
}
