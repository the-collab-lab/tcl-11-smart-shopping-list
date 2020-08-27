import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from '../Firebase/Firebase.component';
import './Lists.style.scss';

const Lists = () => {
  //To store all the keys from local storage
  const keys = Object.keys(localStorage);

  //To store keys that are present in database
  let validKeys = [];
  const [currentKeys, setCurrentKeys] = useState([]);

  //To check if the token is in database
  const validateToken = async tokenValue => {
    let tokenRef = firebase.dataBase.collection(`${tokenValue}`);
    let snapshot = await tokenRef.get();

    if (!snapshot.empty) {
      validKeys.push(tokenValue);
      return validKeys;
    } else {
      return null;
    }
  };

  //Go through all the keys and check which of them are valid
  useEffect(() => {
    async function fetchData() {
      let index = 0;

      while (index < keys.length) {
        await validateToken(keys[index]);
        index++;
      }

      setCurrentKeys(currentKeys.concat(validKeys));
    }
    fetchData();
  }, []);

  return (
    <div>
      {currentKeys.map(key => (
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
