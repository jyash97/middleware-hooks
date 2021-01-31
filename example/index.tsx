import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useLogger } from '../.';

const countReducer = (state = 0, action) => {
  if (action.type === 'INC') {
    return state + 1;
  }

  if (action.type === 'DEC') {
    return state - 1;
  }

  return state;
};

export default function App() {
  const [count, dispatch] = useLogger(countReducer, 0);
  return (
    <div className="App">
      {/** @ts-ignore */}
      <h1>{count}</h1>
      {/** @ts-ignore */}

      <button onClick={() => dispatch({ type: 'INC' })}>+</button>
      {/** @ts-ignore */}

      <button onClick={() => dispatch({ type: 'DEC' })}>-</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
