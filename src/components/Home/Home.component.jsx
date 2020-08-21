import React, { useState, useEffect } from 'react';
import getToken from '../../lib/tokens';
import { useHistory } from 'react-router-dom';
import { FormInput, Lists } from '../component.index';
import CustomButton from '../CustomButton/CustomButton.component';
const Home = () => {
  const [localToken, setLocalToken] = useState('');
  const [tokenValue, setTokenValue] = useState('');

  const history = useHistory();

  const joinExistingList = () => {
    console.log('joinExistingList was called');
    addTokenToStorage(tokenValue);
  };

  const generateToken = () => {
    console.log('called generate token');

    //To generate a new token:
    const token = getToken();
    setLocalToken(token);

    //To set the item to the local storage
    addTokenToStorage(token);

    // To go to addItem page
    history.push('/list', { localToken: token });
  };

  // Redirect to the Add Item View
  const redirectAddItem = () => {
    history.push('/addItem');
  };

  //To add the token to the storage
  const addTokenToStorage = token => {
    //To set the item to the local storage
    console.log('local token: ', token);
    localStorage.setItem(token, token);
    console.log('local storage: ', localStorage);
  };

  // To
  const onChange = event => {
    setTokenValue(event.target.value);
  };

  useEffect(() => {
    console.log(tokenValue);
  }, [tokenValue]);

  return (
    <div>
      <h1 className="page__title">Welcome to your Smart Shoppping list!</h1>
      <br /> <br />
      <button onClick={generateToken}>Create a New Shopping List</button>
      <p> or </p>
      <p> Join an existing shopping list by entering a three word token</p>
      <FormInput onChange={onChange} label={'Share Token'} value={tokenValue} />
      <button onClick={joinExistingList}>Join an existing list</button>
      <Lists />
    </div>
  );
};

export default Home;
