import dotenv, {DotenvParseOutput} from 'dotenv';
import packageJson from '../package.json';

export type TMode = 'development' | 'production';

type TEnv = {
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
const getEnv = (mode: TMode): DotenvParseOutput | TEnv | undefined => {
  let env: DotenvParseOutput | TEnv | undefined = dotenv.config({path: `env/.env.${mode}`}).parsed;
  if (!env) env = {};
  env.NODE_ENV = mode;
  env.VERSION = packageJson.version;
  if (mode === 'development') {
    env.PROXY_HOST = env.PROXY_HOST ? env.PROXY_HOST : '';
    env.PROXY_PATH = env.PROXY_PATH ? env.PROXY_PATH : '';
    if (env.SCHEMA === undefined) {
      env.SCHEMA = 'http';
    }
    if (env.HOST === undefined) {
      env.HOST = '127.0.0.1';
    }
    if (env.PORT === undefined) {
      env.PORT = 3000;
    }
  }
  if (env.STATIC_DIR === undefined) {
    env.STATIC_DIR = 'static';
  }
  return env;
};

export default getEnv;
