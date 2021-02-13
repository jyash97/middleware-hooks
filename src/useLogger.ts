import { useReducer, useCallback } from 'react';

export const useLogger = <T>(
  reducer: (
    stateArg: T,
    actionArg: {
      type: string;
      [key: string]: unknown;
    }
  ) => T,
  initialState: any
) => {
  const _reducer = useCallback((state: any, action: any) => {
    const newState = reducer(state, action);

    console.groupCollapsed(
      '%caction' +
        `%c ${action.type}` +
        `%c @ ${new Date().toLocaleString()}`,
      'font-weight: normal; color: #8c8c8c;',
      'font-weight: bold, color: #262626;',
      'font-weight: normal; color: #8c8c8c;'
    );
    console.log('%cprev state ', 'font-weight: bold; color: #8c8c8c;', state);
    console.log('%caction ', 'font-weight: bold; color: #1890ff;', action);
    console.log(
      '%cnext state ',
      'font-weight: bold; color: #73d13d;',
      newState
    );
    console.groupEnd();


    return newState;
  }, []);

  return useReducer(_reducer, initialState);
};
