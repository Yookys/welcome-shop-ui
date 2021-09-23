import HtmlWebpackPlugin from 'html-webpack-plugin';
import {createProxyMiddleware, RequestHandler} from 'http-proxy-middleware';
import getEnv from './env.config';
import getCommonWebpackConfig from './webpack.common.config';
import path from 'path';

/**
 * Подтягиваем окружение
 */
const env = getEnv('development');

/**
 * Подтягиваем общую конфигурацию
 */
const commonConfig = getCommonWebpackConfig('development');

/**
 * Конфигурация для разработки
 */
export default {
  ...commonConfig,
  plugins: [
    ...commonConfig.plugins!,
    new HtmlWebpackPlugin({
      template: path.resolve(path.dirname(__dirname), 'public', 'index.html'),
      chunks: ['main'],
    }),
  ],
  devServer: {
    host: env!.HOST,
    port: env!.PORT,
    public: `${env!.SCHEMA}://${env!.HOST}:${env!.PORT}`,
    contentBase: path.resolve(path.dirname(__dirname), 'public'),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
    https: env!.SCHEMA && env!.SCHEMA === 'https',
    watchContentBase: true,
    disableHostCheck: true,
    compress: true,
    inline: true,
    open: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    clientLogLevel: 'silent',
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false,
      entrypoints: false,
      builtAt: false,
    },
    after: (app: {use: (arg0: string, arg1: RequestHandler) => void}) => {
      if (env!.PROXY_HOST && env!.PROXY_PATH) {
        app.use(
          env!.PROXY_PATH,
          createProxyMiddleware(env!.PROXY_PATH, {
            target: env!.PROXY_HOST,
            headers: {Origin: env!.PROXY_HOST},
            secure: false,
            changeOrigin: true,
            autoRewrite: true,
            ws: true,
            logLevel: 'debug',
          })
        );
      }
    },
  },
};
