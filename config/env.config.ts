import dotenv from 'dotenv';

export type TMode = 'development' | 'production';

export type TEnv = {
  NODE_ENV?: 'development' | 'production';
  VERSION?: string;
  SCHEMA?: string;
  HOST?: string;
  PORT?: number;
  PROXY_HOST?: string;
  PROXY_PATH?: string;
  STATIC_DIR?: string;
};

/**
 * Формируем окружение
 * @param mode - Режим сборки
 */
const getEnv = (mode: TMode): TEnv => {
  const env: TEnv = dotenv.config({path: `env/.env.${mode}`}).parsed!;
  env.NODE_ENV = mode;
  if (mode === 'development') {
    env.PROXY_HOST = env.PROXY_HOST || '';
    env.PROXY_PATH = env.PROXY_PATH || '';
    env.SCHEMA = env.SCHEMA || 'http';
    env.HOST = env.HOST || '127.0.0.1';
    env.PORT = env.PORT || 3000;
  }
  env.STATIC_DIR = env.STATIC_DIR || 'static';

  return env;
};

export default getEnv;
