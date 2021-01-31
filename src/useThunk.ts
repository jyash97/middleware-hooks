import { useCallback, useReducer } from 'react';

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
  const [store, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (
      action:
        | { type: string }
        | ((dispatchArg: React.Dispatch<{ type: string }>) => void)
    ) => {
      if (typeof action === 'function') {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    []
  );

  return [store, enhancedDispatch];
};
