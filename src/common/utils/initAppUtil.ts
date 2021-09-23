import ReactDOM from 'react-dom';
import Axios from 'axios';

import setPolyfills from '../polyfills/ie';
import configUtil from './configUtil/configUtil';

/**
 * Инициализация
 * @param app - Запускаемое приложение
 */
const initApp = (app: JSX.Element): void => {
  /** Добавление недостающих полифилов (для IE) */
  setPolyfills();

  /**
   * Ошибка инициализации
   * @param {any} error - Ошибка
   */
  const onErrorInit = (error: Error) => {
    throw new Error(error.message);
  };

  /**
   * Успешная инициализация
   */
  const onSuccessInit = () => {
    ReactDOM.render(app, document.getElementById('root'));
  };
  /**
   * Инициализация, точка входа
   * Запрашиваем конфигурацию с URL`s endpoint`s, обрабатываем её и запускаем ПО
   */
  Axios.get(`/static/configs/${process.env.CONFIG}.json`)
    .then((responseConfig) => {
      configUtil.init(responseConfig.data);
      onSuccessInit();
    })
    .catch(onErrorInit);
};

export default initApp;
