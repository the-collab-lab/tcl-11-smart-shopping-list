import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import { useHistory } from 'react-router-dom';
import { FormInput, Lists } from '../component.index';
import * as firebase from '../Firebase/Firebase.component';

import './Home.style.scss';

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

    localStorage.setItem('token', token);


    // To go to addItem page
    history.push('/list', { localToken: token });
  };

  //To add the token to the storage
  const addTokenToStorage = token => {
    //To set the item to the local storage
    localStorage.setItem(token, token);
  };

  // Dynamically sets our tokenValue based on our FormInput's value
  const onChange = event => {
    setTokenValue(event.target.value);
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
            <p>You do not have a shopping list created.</p>
            <button onClick={generateToken}>Create a New Shopping List</button>
          </div>
        </>
      )}

    <div className="home__page">
      <h1 className="page__title">Welcome to your Smart Shopping list!</h1>

      <button onClick={generateToken} className="page__button">
        Create a New Shopping List
      </button>
      <p className="page__or__message"> or </p>
      <p className="page__subtitle">
        Join an existing shopping list by entering a three word token
      </p>
      <FormInput onChange={onChange} label={'Share Token'} value={tokenValue} />
      <button
        onClick={joinExistingList}
        className={`${!tokenValue ? 'button--disabled' : ''} page_button`}
      >
        {`
        ${!tokenValue ? 'Please enter List name first' : 'Add a token'}`}
      </button>
      <p className="page__subtitle">
        Click on the token to select the list you want to edit:
      </p>
      <Lists />
      
    </div>
  );
};

export default Home;
