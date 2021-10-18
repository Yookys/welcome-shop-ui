// @ts-ignore
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin';
import {DefinePlugin, HotModuleReplacementPlugin, Configuration as WebpackConfiguration} from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {FileDescriptor, WebpackManifestPlugin} from 'webpack-manifest-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import getEnv, {TEnv, TMode} from './env.config';
import pathNames from './path.config';

/**
 * Общая конфигурация webpack
 */
const getCommonWebpackConfig: (mode: TMode) => WebpackConfiguration = (mode) => {
  /** Подтягиваем окружение */
  const env: TEnv = getEnv(mode);

  return {
    mode,
    bail: mode !== 'development',
    target: mode === 'production' ? 'browserslist' : 'web',
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    entry: ['react-hot-loader/patch', pathNames.entry],
    output: {
      filename: `${env.STATIC_DIR}/js/[name].[contenthash:20].bundle.js`,
      chunkFilename: `${env.STATIC_DIR}/js/[name].[contenthash:20].chunk.js`,
      assetModuleFilename: `${env.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
      path: mode !== 'development' ? pathNames.outputBuild : pathNames.outputDev,
      pathinfo: true,
      publicPath: 'auto',
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        '@common': pathNames.commonAlias,
        '@assets': pathNames.assetsAlias,
        '@modules': pathNames.modulesAlias,
        '@core': pathNames.coreAlias,
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
                  options: {
                    name: `${env.STATIC_DIR}/configs/[name].[contenthash:20].[ext]`,
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
                    name: `${env.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
                  },
                },
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
              options: {
                name: `${env.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
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
                name: `${env.STATIC_DIR}/media/[name].[contenthash:20].[ext]`,
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
        fileName: `${env.STATIC_DIR}/configs/asset-manifest.json`,
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
