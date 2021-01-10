import { useReducer } from 'react';

export enum ACTION_TYPES {
  REDO = 'REDO',
  UNDO = 'UNDO',
}

interface InternalState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface InternalActionType {
  type: ACTION_TYPES;
}

export const useUndoRedo = <T>(
  reducer: (stateArg: T, actionArg: { type: string }) => T,
  initialState: T
) => {
  const _internalState: InternalState<T> = {
    past: [],
    present: initialState,
    future: [],
  };

  const _reducer = (state: InternalState<T>, action: InternalActionType) => {
    switch (action.type) {
      case ACTION_TYPES.UNDO: {
        const [newPresent, ...past] = state.past;
        return {
          past,
          present: newPresent,
          future: [state.present, ...state.future],
        };
      }
      case ACTION_TYPES.REDO: {
        const [newPresent, ...future] = state.future;
        return {
          past: [state.present, ...state.past],
          present: newPresent,
          future,
        };
      }
      default: {
        const presentState = reducer(state.present, action);
        return {
          ...state,
          past: [state.present, ...state.past],
          present: presentState,
        };
      }
    }
  };

  const [store, dispatch] = useReducer(_reducer, _internalState);

  return {
    data: store.present,
    hasFuture: store.future.length !== 0,
    hasPast: store.past.length !== 0,
    dispatch,
  };
};
