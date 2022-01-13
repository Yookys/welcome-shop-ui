import {useHistory} from 'react-router';
import {useCallback} from 'react';

/**
 * Хук для взаимодействия с роутингом
 */
const useRouter = () => {
  /** Используем роутинг React */
  const history = useHistory();

  /**
   * Смена локации
   * @param path - Целевая локация
   */
  const goTo = (path: string) => useCallback(() => history.push(path), [path]);

  return {history, goTo};
};

export default useRouter;
