import {responseInterceptor, rejectInterceptor} from './axiosInstance';

/**
 * Методы экземпляра axios`а
 */
describe('axiosInstance tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  /** responseInterceptor */
  it('responseInterceptor', () => {
    expect(
      responseInterceptor({
        data: {test: 'test'},
        status: 200,
        statusText: 'succes',
        headers: {},
        config: {},
      }).status
    ).toBe(200);
    expect(
      responseInterceptor({
        data: null,
        status: 200,
        statusText: 'succes',
        headers: {},
        config: {},
      }).data
    ).toMatchObject({});
  });

  /** rejectInterceptor */
  it('rejectInterceptor', async () => {
    await rejectInterceptor({
      name: 'test',
      message: 'testMessage',
      config: {},
      isAxiosError: false,
      toJSON: () => ({}),
    }).catch((reject) => {
      expect(reject.response.status).toBe(500);
    });
    await rejectInterceptor({
      name: 'test',
      message: 'testMessage',
      response: {
        data: 'test',
        status: 500,
        statusText: 'Internal server Error',
        headers: {},
        config: {},
      },
      config: {},
      isAxiosError: false,
      toJSON: () => ({}),
    }).catch((reject) => {
      expect(reject.response.data.status).toBe(500);
    });
  });
});
