import HtmlWebpackPlugin from 'html-webpack-plugin';
import {Configuration} from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import getEnv, {TEnv} from './env.config';
import getCommonWebpackConfig from './webpack.common.config';
import pathNames from './path.config';

/** Подтягиваем окружение */
const env: TEnv = getEnv('production');

/** Подтягиваем общую конфигурацию */
const commonConfig: Configuration = getCommonWebpackConfig('production');

/**
 * Конфигурация для сборки
 */
export default {
  ...commonConfig,
  plugins: [
    ...commonConfig.plugins!,
    new HtmlWebpackPlugin({
      template: pathNames.htmlTemplate,
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
    new CleanWebpackPlugin(),
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
