import { useCallback, useReducer, useRef } from 'react';

export const useThunk = <T>(
  reducer: (
    stateArg: T,
    actionArg: {
      type: string;
      [key: string]: unknown;
    }
  ) => T,
  initialState: T
) => {
  const storeRef = useRef(initialState);

  const _reducer = useCallback((state: any, action: any) => {
    const newState = reducer(state, action);
    storeRef.current = newState;
    return newState;
  }, [])

  const [store, dispatch] = useReducer(_reducer, initialState);

  const getState = useCallback(() => {
    return storeRef.current;
  }, [storeRef])

  const enhancedDispatch = useCallback(
    (
      action: any
    ) => {
      if (typeof action === 'function') {
        action(dispatch, getState);
      } else {
        dispatch(action);
      }
    },
    []
  );

  return [store, enhancedDispatch];
};
