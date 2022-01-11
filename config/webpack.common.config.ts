// @ts-ignore
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin';
import {DefinePlugin, Configuration as WebpackConfiguration} from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import getEnv, {TMode} from './env.config';
import pathNames from './path.config';

/**
 * Общая конфигурация webpack
 * @param mode - Режим запуска
 */
const getCommonWebpackConfig: (mode: TMode) => WebpackConfiguration = (mode) => {
  /**
   * Подтягиваем окружение
   */
  const env = getEnv(mode);

  return {
    mode: mode === 'development' ? mode : 'production',
    bail: mode !== 'development',
    target: mode !== 'development' ? ['web', 'es5'] : 'web',
    devtool: mode !== 'development' ? 'inline-source-map' : 'source-map',
    entry: pathNames.entry,
    output: {
      filename: `${env.STATIC_DIR}/js/[name].[contenthash:20].js`,
      chunkFilename: `${env.STATIC_DIR}/js/[name].[contenthash:20].chunk.js`,
      path: mode !== 'development' ? pathNames.outputBuild : pathNames.outputDev,
      pathinfo: true,
      publicPath: 'auto',
      crossOriginLoading: 'use-credentials',
    },
    resolve: {
      alias: {
        '@common': pathNames.commonAlias,
        '@assets': pathNames.assetsAlias,
        '@modules': pathNames.modulesAlias,
        '@Core': pathNames.core,
        '@User': pathNames.user,
        '@Catalog': pathNames.catalog,
        '@Dashboard': pathNames.dashboard,
      },
      extensions: [
        '.web.mjs',
        '.mjs',
        '.web.js',
        '.js',
        '.web.ts',
        '.ts',
        '.web.tsx',
        '.tsx',
        '.json',
        '.web.jsx',
        '.jsx',
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {parser: {requireEnsure: false}},
        {
          oneOf: [
            {
              test: [/\.avif$/],
              loader: 'url-loader',
              options: {
                mimetype: 'image/avif',
                name: `${env.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
              },
            },
            {
              test: /\.json$/,
              type: 'javascript/auto',
              use: [
                {
                  loader: 'json-loader',
                },
              ],
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{removeViewBox: false}],
                    },
                    filenameCase: 'pascal',
                    titleProp: true,
                    ref: true,
                  },
                },
              ],
            },
            {
              test: /\.(ts|js)x?$/i,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                  plugins: [['@babel/plugin-transform-runtime', {regenerator: true}]],
                  cacheDirectory: true,
                },
              },
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/],
              use: 'file-loader',
            },
          ],
        },
      ],
    },
    optimization:
      mode === 'production'
        ? {
            minimize: true,
            removeEmptyChunks: true,
            removeAvailableModules: true,
            mergeDuplicateChunks: true,
            mangleWasmImports: true,
            flagIncludedChunks: true,
            concatenateModules: true,
          }
        : {},
    plugins: [
      new CleanTerminalPlugin(),
      new DefinePlugin({'process.env': JSON.stringify(env)}),
      new ForkTsCheckerWebpackPlugin({async: false}),
      new ESLintPlugin({extensions: ['js', 'jsx', 'ts', 'tsx']}),
    ],
  };
};

export default getCommonWebpackConfig;
