import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from '../Firebase/Firebase.component';
import './Lists.style.scss';

const Lists = () => {
  //Stores all the keys from local storage
  const keys = Object.keys(localStorage);

  let validKeys = [];
  const [alternativeArray, setAlternativeArray] = useState([]);

  //To check if the token is in database and if so, add it to validKeyes
  const validateToken = async tokenValue => {
    console.log('RECEIVED THE FOLLOWING TOKEN:', tokenValue);
    let tokenRef = firebase.dataBase.collection(`${tokenValue}`);
    let snapshot = await tokenRef.get();
    if (snapshot.empty) {
      console.log('TOKEN NOT (!) IN DATABASE', tokenValue);
    } else {
      console.log('TOKEN IN DATABASE', tokenValue);
      validKeys.push(tokenValue);

      // setAlternativeArray(validKeys);
    }
    console.log('UPDATED VALID KEYS', validKeys);
    // setAlternativeArray(validKeys);
  };

  //Go through all the keys and check which of them are valid
  let index = 0;
  while (index < keys.length) {
    validateToken(keys[index]);
    index++;
    // setAlternativeArray(validKeys);
  }

  //Alternative does the same thing as lines 15-37
  // const forLoop = async _ => {
  // console.log('Start');
  // for (let index = 0; index < keys.length; index++) {
  // let tokenValue = keys[index];
  // console.log('RECEIVED THE FOLLOWING TOKEN:', tokenValue);
  // let tokenRef = firebase.dataBase.collection(`${tokenValue}`);
  // let snapshot = await tokenRef.get();
  // if (snapshot.empty) {
  //   console.log('NOT (!) IN DATABASE', tokenValue);
  // }
  // else{
  //   console.log('IN DATABASE', tokenValue);
  //   validKeys.push(tokenValue);
  //   console.log('UPDATED VALID KEYS', validKeys);
  //   localStorage.setItem("validKeys", JSON.stringify(validKeys));

  //   // setAlternativeArray(validKeys);
  // }
  // console.log('End');
  // //  setAlternativeArray(validKeys);
  // };
  // // setAlternativeArray(validKeys);
  // }

  // useEffect(() => {
  //   forLoop();
  // }, [])

  useEffect(() => {}, [validKeys]);

  console.log('------KEYS: ', keys);
  console.log('------VALID KEYS: ', validKeys);
  console.log('------ALTERNATIVE ARRAY: ', alternativeArray);

  return (
    <div>
      <p className="lists__header">Available Lists:</p>

      {validKeys.map(key => (
        <Link
          className="lists__link"
          to={{ pathname: '/list', state: { localToken: key } }}
        >
          <div> {key} </div>
        </Link>
      ))}
    </div>
  );
};

export default Lists;
