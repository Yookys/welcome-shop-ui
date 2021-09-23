import services from '../../constants/configConst';
import {debug, isEmpty} from '../commonUtils/commonUtils';
import {DebugTypes, IObj} from '../../models/commonModel';
import {IConfig, IConfigModel} from '../../models/initAppModels';

/**
 * Общий класс, содержащий и формирующий конфигурацию
 */
class ConfigUtil {
  services: IObj = {};

  debug: boolean = false;

  /**
   * Конструктор
   */
  constructor() {
    Object.values(services).forEach((service: string) => {
      this.services[service] = '';
    });
    this.init = this.init.bind(this);
  }

  /**
   * Инициализация конфига
   * @param {Object} configuration - Результат запроса конфигурации
   */
  init(configuration: IConfigModel) {
    this.debug = configuration.DEBUG;
    const servicesTmp: IConfig = configuration.SERVICES;
    /** Проверка на пустоту конфига */
    if (servicesTmp === undefined) {
      throw new Error(`Config error (${process.env.CONFIG}) - is empty HOSTS.`);
    }
    /** Проверка на корректный JSON */
    try {
      JSON.stringify(servicesTmp);
    } catch (exception) {
      throw new Error(`Config error (${process.env.CONFIG}) - parse error.`);
    }
    /** Проверка на наличие обязательных сервисов */
    Object.values(services).forEach((requiredSupportServiceName: string) => {
      if (
        isEmpty(
          Object.keys(servicesTmp).find((configServiceName: string) => configServiceName === requiredSupportServiceName)
        )
      ) {
        throw new Error('Required HOSTS configurations not found');
      }
    });
    /** Конфигурирование URL сервисов */
    Object.keys(servicesTmp).forEach((serviceName: string) => {
      /** Хост */
      this.services[serviceName] = !isEmpty(servicesTmp[serviceName].HOST)
        ? `${this.services[serviceName]}${servicesTmp[serviceName].HOST}`
        : `${this.services[serviceName]}${window.location.hostname}`;
      /** Порт */
      this.services[serviceName] = !isEmpty(servicesTmp[serviceName].PORT)
        ? `${this.services[serviceName]}:${servicesTmp[serviceName].PORT}`
        : `${this.services[serviceName]}:${window.location.port}`;
      /** Путь */
      if (isEmpty(servicesTmp[serviceName].PATH)) {
        throw new Error(
          `Config error (${process.env.CONFIG}) - the service (${serviceName}) does not have the "PATH" parameter.`
        );
      } else {
        const path = servicesTmp[serviceName].PATH.replace(
          '${API_BASEPATH}',
          configuration.API_BASEPATH ? configuration.API_BASEPATH : ''
        );
        this.services[serviceName] = `${this.services[serviceName]}${path}`;
      }
      /** Схема */
      this.services[serviceName] = !isEmpty(servicesTmp[serviceName].SCHEMA)
        ? `${servicesTmp[serviceName].SCHEMA}://${this.services[serviceName]}`
        : `${window.location.protocol}//${this.services[serviceName]}`;
    });
    debug({message: 'Config loaded:', optionalParams: [{services: this.services}]}, DebugTypes.log, this.debug);
  }
}

const wsUtils = new ConfigUtil();
export default wsUtils;
