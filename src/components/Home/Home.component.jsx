import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import { useHistory } from 'react-router-dom';
const Home = () => {
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
    history.push('/list');
  };
  // Redirect to the Add Item View
  const redirectAddItem = () => {
    history.push('/addItem');
  };
  return (
    <div>
      {localToken ? (
        <>
          <h1 className="page__title">Welcome Back!</h1>
          <br /> <br />
          <button onClick={redirectAddItem}>Add a new Item</button>
        </>
      ) : (
        <>
          <div>
            <h1 className="page__title">Welcome!</h1>
            <br /> <br />
            <p>You do not have a shopping list created.</p>
            <button onClick={generateToken}>Create a New Shopping List</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
