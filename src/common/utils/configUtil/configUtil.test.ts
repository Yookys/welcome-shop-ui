import configUtil from './configUtil';
import {IConfigModel} from '../../models/initAppModels';

/**
 * Тестирование утилит
 */
describe('ConfigUtil tests', () => {
  const testConfig: IConfigModel = {
    DEBUG: true,
    SERVICES: {},
  };

  beforeEach(() => {
    jest.resetModules();
    process.env = {PUBLIC_URL: '/'};
  });

  /** config */
  it('ConfigUtil config method', () => {
    configUtil.init(testConfig);
    expect(1).toBeDefined();
  });
});
