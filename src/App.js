// Import Statements
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

// Custom Imports
import { List, AddItem, Footer } from './components';
import AddItemFirebase from './components/AddItemFirebase/AddItem.componentFirebase';
import Listener from './services/Listener/Listener.service';

import './App.css';

function App() {
  //To display the items from database
  const [itemsDisplay, setItemsDisplay] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setItemsDisplay(true)}>Click to get items!</button>
      {itemsDisplay && <Listener />}
      <AddItemFirebase />
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/addItem" component={AddItem} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
