import React, { useState } from 'react';
import Listener from '../../services/Listener/Listener.service';
import { useHistory } from 'react-router-dom';

const List = () => {
  const [localToken, setLocalToken] = useState(localStorage.getItem('token'));
  const history = useHistory();
  // Redirect to the Add Item View
  const redirectAddItem = () => {
    history.push('/addItem');
  };

  return (
    <div>
      <h1 className="page__title">Shopping List</h1>

      {localToken ? (
        <>
          <Listener />
          <button onClick={redirectAddItem}> Add Item</button>
        </>
      ) : (
        <>
          <div>
            <p> Your shopping list is currently empty.</p>
            <button onClick={redirectAddItem}> Add Item</button>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
