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
      <h1 className="page__title">List</h1>
      <div>
        <input type="text" className="input" placeholder="Search..." />
      </div>

      {localToken ? (
        <>
          <Listener />
          {/* //?? Empty list displays nothing to the user */}
          <br /> <br />
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
