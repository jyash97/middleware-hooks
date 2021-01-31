import { useReducer, useCallback, useMemo } from 'react';

export enum TYPES {
  RESET = 'RESET_PERSIST',
}

const getLocalStorageItem = (key: string) => {
  if (!key) {
    return null;
  }
  const retrievedItem = localStorage.getItem(key);

  if (retrievedItem) {
    try {
      return JSON.parse(retrievedItem);
    } catch (e) {
      return retrievedItem;
    }
  }
};

const setLocalStorageItem = (key: string, value: any) => {
  if (!key) {
    return;
  }
  return localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );
};

export const usePersist = (reducer: any, initialState: any) => {
  const storageKey = useMemo(() => reducer.name, []);

  const _reducer = useCallback((state: any, action: any) => {
    if (action.type === TYPES.RESET) {
      localStorage.removeItem(storageKey);
      return initialState;
    }

    const newState = reducer(state, action);

    setLocalStorageItem(storageKey, newState);

    return newState;
  }, []);

  return useReducer(_reducer, getLocalStorageItem(storageKey) || initialState);
};

export const resetStorage = () => ({
  type: TYPES.RESET,
});
