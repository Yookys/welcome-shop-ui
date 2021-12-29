import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import getEnv from './env.config';
import getCommonWebpackConfig from './webpack.common.config';
import pathNames from './path.config';

/**
 * Подтягиваем окружение
 */
const env = getEnv('production');

/**
 * Подтягиваем общую конфигурацию
 */
const commonConfig = getCommonWebpackConfig('production');

/**
 * Конфигурация для сборки
 */
export default {
  ...commonConfig,
  plugins: [
    ...commonConfig.plugins!,
    new HtmlWebpackPlugin({
      template: pathNames.htmlTemplate,
      publicPath: '/',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${env.STATIC_DIR}/css/[name].[contenthash:20].css`,
      chunkFilename: `${env.STATIC_DIR}/css/[name].[contenthash:20].chunk.css`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
  ],
};
