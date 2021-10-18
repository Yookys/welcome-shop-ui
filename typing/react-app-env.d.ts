/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production';
    VERSION?: string;
    STATIC_DIR?: string;
  }
}
