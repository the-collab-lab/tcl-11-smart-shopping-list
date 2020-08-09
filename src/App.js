// Import Statements
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Custom Imports
import { List, AddItem, Footer } from './components';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/addItem" component={AddItem} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
