import React, { useState, useEffect } from 'react';
import * as firebase from './Firebase/Firebase.js';

const Items = () => {
  const [items, setItems] = useState([]);
  const collectionName = 'items';
  let itemsInCollection = [];

  //To get items list from the database
  useEffect(() => {
    firebase.dataBase
      .collection(collectionName)
      .get()

      .then(response => {
        console.log('OK');
        itemsInCollection = response.docs.map(doc => doc.data());
        setItems(itemsInCollection);
        console.log(itemsInCollection);
        console.log(items);
      })

      .catch(error => {
        console.log('ERROR: ', error);
      });
  }, []);

  console.log(items);

  return (
    <div className="classItems">
      {items.map(item => (
        <div key={item.name}> {item.name} </div>
      ))}
    </div>
  );
};

export default Items;
