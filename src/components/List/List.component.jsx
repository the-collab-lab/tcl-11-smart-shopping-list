import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import Listener from '../../services/Listener/Listener.service';
import { useHistory } from 'react-router-dom';

const List = () => {
  const [localToken, setLocalToken] = useState(localStorage.getItem('token'));
  const history = useHistory();

  const generateToken = () => {
    console.log('called generate token');

    //To generate a new token:
    const token = getToken();
    setLocalToken(token);

    //To set the item to the local storage
    localStorage.setItem('token', token);
    console.log('local storage: ', localStorage);
    // To go to addItem page
    history.push('/addItem');
  };

  return (
    <div>
      <h1 className="page__title">List</h1>

      {localToken ? (
        <Listener />
      ) : (
        <div>
          {' '}
          <p> Your shopping list is currently empty.</p>
          <button onClick={generateToken}> Add Item</button>{' '}
        </div>
      )}
    </div>
  );
};

export default List;
