import dotenv from 'dotenv';

export type TMode = 'development' | 'production' | string;

type TEnv = {
  NODE_ENV?: string;
  SCHEMA?: string;
  HOST?: string;
  PORT?: number;
  STATIC_DIR?: string;
  APP_CONFIG?: 'DEV' | 'PROD';
};

/**
 * Формируем окружение
 * @param mode - Режим сборки
 */
const getEnv = (mode: TMode): TEnv => {
  const env: TEnv = dotenv.config({path: `env/.env.${mode}`}).parsed!;
  env.NODE_ENV = mode;
  /** Окружение для разработки */
  if (mode === 'development') {
    /** Схема для разработки */
    env.SCHEMA = !env.SCHEMA ? 'http' : env.SCHEMA;
    /** Хост для разработки */
    env.HOST = !env.HOST ? 'localhost' : env.HOST;
    /** Порт для разработки */
    env.PORT = !env.PORT ? 3000 : env.PORT;
  }
  /** Директория для статических */
  env.STATIC_DIR = env.STATIC_DIR || 'static';
  /** Режим отладки */
  env.APP_CONFIG = env.APP_CONFIG || 'DEV';

  return env;
};

export default getEnv;
