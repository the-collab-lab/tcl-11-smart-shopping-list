import React, { useState } from 'react';
import Items from './Items';
import './App.css';
// import logo from './logo.svg';

function App() {
  const [itemsDisplay, setItemsDisplay] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setItemsDisplay(true)}>Click to get items!</button>
      {itemsDisplay && <Items />}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
