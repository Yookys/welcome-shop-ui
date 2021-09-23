import StorageAdapter from './StorageAdapter';

/**
 * Адаптера для хранилищ
 */
describe('StorageAdapter tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  /** StorageAdapter */
  it('StorageAdapter', () => {
    let storageAdapter = new StorageAdapter(window.localStorage);
    storageAdapter.setItem('test', 'testVal');
    expect(storageAdapter.getItem('test')).toBe('testVal');
    storageAdapter.setItem('test', '{test: test}');
    expect(storageAdapter.getItem('test')).toBe('{test: test}');
    storageAdapter.removeItem('test');
    expect(storageAdapter.getItem('test')).toBe(null);

    storageAdapter = new StorageAdapter(null);
    storageAdapter.setItem('test', 'testVal');
    expect(storageAdapter.getItem('test')).toBe(null);
    storageAdapter.removeItem('test');
  });
});
