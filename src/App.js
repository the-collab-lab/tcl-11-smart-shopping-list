// Import Statements
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Custom Imports
import { Home, List, AddItem, Footer } from './components/component.index';
import TestComponent from './Testing/test.component';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={List} />
        <Route path="/addItem" component={AddItem} />
        <Route path="/test" component={TestComponent} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
