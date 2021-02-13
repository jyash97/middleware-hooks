import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { redoAction, undoAction, useUndoRedo } from '../.';

const countReducer = (state, action) => {
  if (action.type === 'INC') {
    return state + 1;
  }

  return state;
};

const increment = () => ({
  type: 'INC',
});

export default function App() {
  const { store: count, dispatch, hasPast, hasFuture } = useUndoRedo(
    countReducer,
    0
  );
  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button disabled={!hasPast} onClick={() => dispatch(undoAction())}>
        UNDO
      </button>
      <button disabled={!hasFuture} onClick={() => dispatch(redoAction())}>
        REDO
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
