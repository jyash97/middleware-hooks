import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { usePersist, resetStorage } from '../.';

const nameReducer = (state = 0, action) => {
  if (action.type === 'CHANGE') {
    return { name: action.payload };
  }

  return state;
};

export default function App() {
  const [store, dispatch] = usePersist(nameReducer, { name: '' });
  return (
    <div className="App">
      <h1>{store.name}</h1>
      <input
        value={store.name}
        onChange={e => dispatch({ type: 'CHANGE', payload: e.target.value })}
      />

      <button onClick={() => dispatch(resetStorage())}>Reset</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
