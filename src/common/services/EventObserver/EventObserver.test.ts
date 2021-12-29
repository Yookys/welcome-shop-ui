import EventObserver from './EventObserver';
import {StorageEvent} from '../../models/storageModel';

/**
 * EventObserver
 */
describe('EventObserver tests', () => {
  /**
   * Тестовый слушатель
   * @param data - Событие слушателя
   */
  const testHandler = (data: StorageEvent) => expect(data.value).toBe('test');

  beforeEach(() => {
    jest.resetModules();
  });

  /** subscribe */
  it('EventObserver subscribe', () => {
    EventObserver.subscribe('testEvent', testHandler);
    expect(EventObserver.handlers.testEvent.size).toBe(1);
  });

  /** dispatch */
  it('EventObserver dispatch', () => {
    EventObserver.subscribe('testEvent', testHandler);
    EventObserver.dispatch('testEvent', {key: 'test', value: 'test', storage: window.localStorage});
    EventObserver.dispatch('testEvent2', {key: 'test', value: 'test', storage: window.localStorage});
  });

  /** dispatch */
  it('EventObserver unsubscribe', () => {
    EventObserver.subscribe('testEvent', testHandler);
    expect(EventObserver.handlers.testEvent.size).toBe(1);
    EventObserver.unsubscribe('testEvent', testHandler);
    expect(EventObserver.handlers.testEvent.size).toBe(0);
    EventObserver.unsubscribe('testEvent2', testHandler);
    expect(EventObserver.handlers.testEvent2).toBe(undefined);
  });
});
