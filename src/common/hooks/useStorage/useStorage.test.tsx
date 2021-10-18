import React from 'react';
import {render} from '@testing-library/react';

import {TUseStorageHookReturned, useLocalStorage} from './useStorage';

/** Запуск хука */
const setUp = <T extends any>(key: string): TUseStorageHookReturned<T> => {
  let returnVal: TUseStorageHookReturned<T>;
  function TestComponent() {
    returnVal = [...useLocalStorage<T>(key)];
    return null;
  }
  render(<TestComponent />);
  // @ts-ignore
  return returnVal;
};

/**
 * useStorage test
 */
describe('useStorage tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  /** useStorage */
  it('useStorage test', () => {
    const [testVal, setTestVal, removeTestVal]: TUseStorageHookReturned<string> = setUp<string>('testVal');
    expect(testVal).toBe(null);
    setTestVal('test');

    setTimeout(() => {
      expect(testVal).toBe('test');
      setTestVal('testTest');

      setTimeout(() => {
        expect(testVal).toBe('testTest');
        removeTestVal();

        setTimeout(() => {
          expect(testVal).toBe(null);
        }, 100);
      }, 100);
    }, 100);
    setTestVal('testTest');
    removeTestVal();
  });
});
