import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import getCommonWebpackConfig from './webpack.common.config';
import getEnv from './env.config';
import pathNames from './path.config';

/**
 * Подтягиваем окружение
 */
const env = getEnv('development');

/**
 * Подтягиваем общую конфигурацию
 */
const commonConfig = getCommonWebpackConfig('development');

/**
 * Конфигурация для сборки
 */
export default {
  ...commonConfig,
  plugins: [
    ...commonConfig.plugins!,
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: pathNames.htmlTemplate,
      chunks: ['main'],
    }),
  ],
  devServer: {
    host: env.HOST,
    port: env.PORT,
    public: `${env.SCHEMA}://${env.HOST}:${env.PORT}`,
    contentBase: pathNames.contentBase,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
    publicPath: '/',
    watchContentBase: true,
    disableHostCheck: true,
    compress: true,
    contentBasePublicPath: '/',
    inline: true,
    open: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
      index: '/',
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
  },
};
