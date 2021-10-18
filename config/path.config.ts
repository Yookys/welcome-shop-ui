import path from 'path';

/**
 * Конфигурация путей
 */
const pathNames = {
  src: path.resolve(path.dirname(__dirname), 'src'),
  entry: path.resolve(path.dirname(__dirname), 'src', 'index'),
  outputDev: path.resolve(path.dirname(__dirname), 'dist'),
  outputBuild: path.resolve(path.dirname(__dirname), 'build'),
  htmlTemplate: path.resolve(path.dirname(__dirname), 'public', 'index.html'),
  contentBase: path.resolve(path.dirname(__dirname), 'public'),
  commonAlias: path.resolve(path.dirname(__dirname), 'src/common'),
  assetsAlias: path.resolve(path.dirname(__dirname), 'src/common/assets'),
  modulesAlias: path.resolve(path.dirname(__dirname), 'src/modules'),
  coreAlias: path.resolve(path.dirname(__dirname), 'src/modules/Core'),
};

export default pathNames;
