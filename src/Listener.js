import React, { useState, useEffect } from 'react';
import * as firebase from './Firebase/Firebase.js';

const Listener = () => {
  const [items, setItems] = useState([]);
  const collectionName = 'items';
  let itemsInCollection = [];

  useEffect(() => {
    listenForUpdates();
  }, []);

  //To update the list of items when there is a change
  const listenForUpdates = () => {
    firebase.dataBase.collection(collectionName).onSnapshot(snapshot => {
      itemsInCollection = snapshot.docs.map(doc => doc.data());
      setItems(itemsInCollection);
    });
  };

  console.log(items);

  return (
    <div className="classItems">
      {items.map(item => (
        <div key={item.name}> {item.name} </div>
      ))}
    </div>
  );
};

export default Listener;
