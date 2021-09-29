// @ts-ignore
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin';
import {DefinePlugin, HotModuleReplacementPlugin, Configuration as WebpackConfiguration} from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import {FileDescriptor, WebpackManifestPlugin} from 'webpack-manifest-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import getEnv, {TMode} from './env.config';

/**
 * Общая конфигурация webpack
 */
const getCommonWebpackConfig: (mode: TMode) => WebpackConfiguration = (mode) => {
  /**
   * Подтягиваем окружение
   */
  const env = getEnv(mode);

  return {
    mode,
    bail: mode !== 'development',
    target: mode === 'production' ? ['web', 'es5'] : 'web',
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    entry: ['react-hot-loader/patch', path.resolve(path.dirname(__dirname), 'src', 'index')],
    output: {
      filename: `${env!.STATIC_DIR}/js/[name].[contenthash:20].js`,
      chunkFilename: `${env!.STATIC_DIR}/js/[name].[contenthash:20].chunk.js`,
      path: path.resolve(path.dirname(__dirname), mode !== 'development' ? 'build' : 'dist'),
      pathinfo: true,
      publicPath: 'auto',
    },
    resolve: {
      alias: {'react-dom': '@hot-loader/react-dom'},
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
                name: `${env!.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
              },
            },
            {
              test: /\.json$/,
              type: 'javascript/auto',
              use: [
                {
                  loader: 'json-loader',
                  options: {
                    name: `${env!.STATIC_DIR}/config/[name].[contenthash:20].[ext]`,
                  },
                },
              ],
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    dimensions: false,
                    svgProps: {focusable: '{false}'},
                    name: `${env!.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
                  },
                },
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
              options: {
                name: `${env!.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
              },
            },
            {
              test: /\.(ts|js)x?$/i,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                  plugins: ['react-hot-loader/babel', ['@babel/plugin-transform-runtime', {regenerator: true}]],
                  cacheDirectory: true,
                },
              },
            },
            {
              test: /\.scss$/i,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
              loader: 'file-loader',
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: `${env!.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanTerminalPlugin(),
      new DefinePlugin({'process.env': JSON.stringify(env)}),
      new HotModuleReplacementPlugin(),
      new ForkTsCheckerWebpackPlugin({async: false}),
      new ESLintPlugin({extensions: ['js', 'jsx', 'ts', 'tsx']}),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        generate: (seed, sourceFiles) => ({
          files: sourceFiles
            .filter(({isInitial}) => !isInitial)
            .reduce(
              (files: {[key: string]: string}, file: FileDescriptor) => ({
                [file.name!]: `/${file.path.substr(4, file.path.length)}`,
                ...files,
              }),
              {}
            ),
          entrypoints: sourceFiles
            .filter(({isInitial}) => isInitial)
            .reduce(
              (files: {[key: string]: string}, file: FileDescriptor) => ({
                [file.name!]: `/${file.path.substr(4, file.path.length)}`,
                ...files,
              }),
              {}
            ),
        }),
      }),
    ],
  };
};

export default getCommonWebpackConfig;
