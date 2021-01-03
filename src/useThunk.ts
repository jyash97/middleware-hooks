import { useReducer } from 'react';

export const useThunk = (reducer: any, initialState: any) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = (action: any) => {
    if (typeof action === 'function') {
      action(dispatch);
    } else {
      // @ts-ignore
      dispatch(action);
    }
  };

  return [store, enhancedDispatch];
};
