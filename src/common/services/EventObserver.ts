import {IObj} from '../models/commonModel';
import {StorageEventHandler, StorageEvent} from '../models/storageModel';

/**
 * Класс-слушатель событий
 * Собирает в себе всех слушателей событий и вызывает колл-бэк функции при совершении события
 */
class EventObserver {
  /** Слушатели */
  handlers: IObj = {};

  /**
   * Подписывание на события
   * @param event - Событие
   * @param handler - Слушатель
   */
  subscribe(event: string, handler: StorageEventHandler): void {
    if (!this.handlers[event]) {
      this.handlers[event] = new Map();
    }
    this.handlers[event].set(handler, handler);
  }

  /**
   * Отписывание от событий
   * @param event - Событие
   * @param handler - Слушатель
   */
  unsubscribe(event: string, handler: StorageEventHandler): void {
    if (this.handlers[event]) {
      this.handlers[event].delete(handler);
    }
  }

  /**
   * Отправка событий
   * @param event - Событие
   * @param data - Данные
   */
  dispatch(event: string, data: StorageEvent<any>): void {
    if (this.handlers[event]) {
      this.handlers[event].forEach((handler: StorageEventHandler) => {
        handler(data);
      });
    }
  }
}

const eventObserver = new EventObserver();
export default eventObserver;
