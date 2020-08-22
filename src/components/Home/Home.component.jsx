import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import { useHistory } from 'react-router-dom';
import { FormInput, Lists } from '../component.index';
import * as firebase from '../Firebase/Firebase.component';

const Home = () => {
  const [localToken, setLocalToken] = useState('');
  const [tokenValue, setTokenValue] = useState('');

  const history = useHistory();

  const joinExistingList = async () => {
    let tokenRef = firebase.dataBase.collection(`${tokenValue}`);
    let snapshot = await tokenRef.get();

    if (snapshot.empty) {
      alert(
        "Sorry, this collection doesn't exist. Please try again or create a new list.",
      );
    } else {
      addTokenToStorage(tokenValue);
      history.push('/');
    }
  };

  const generateToken = () => {
    //To generate a new token:
    const token = getToken();
    setLocalToken(token);

    //To set the item to the local storage
    addTokenToStorage(token);

    // To go to addItem page
    history.push('/list', { localToken: token });
  };

  //To add the token to the storage
  const addTokenToStorage = token => {
    //To set the item to the local storage
    localStorage.setItem(token, token);
  };

  // To
  const onChange = event => {
    setTokenValue(event.target.value);
  };

  return (
    <div>
      <h1 className="page__title">Welcome to your Smart Shoppping list!</h1>
      <br /> <br />
      <button onClick={generateToken}>Create a New Shopping List</button>
      <p> or </p>
      <p> Join an existing shopping list by entering a three word token</p>
      <FormInput onChange={onChange} label={'Share Token'} value={tokenValue} />
      <button
        onClick={joinExistingList}
        className={`${!tokenValue ? 'button--disabled' : ''}`}
      >
        {`
        ${
          !tokenValue ? 'Please enter List name first' : 'Join an existing list'
        }`}
      </button>
      <Lists />
    </div>
  );
};

export default Home;
