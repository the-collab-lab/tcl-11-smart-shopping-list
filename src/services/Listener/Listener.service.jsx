import React, { useState, useEffect } from 'react';
import * as firebase from '../../components/Firebase/Firebase.component';

const Listener = () => {
  const [items, setItems] = useState([]);
  const collectionTokenName = localStorage.getItem('token');
  let itemsInCollection = [];

  useEffect(() => {
    listenForUpdates();
  }, []);

  //To update the list of items when there is a change
  const listenForUpdates = () => {
    firebase.db.collection(collectionTokenName).onSnapshot(snapshot => {
      itemsInCollection = snapshot.docs.map(doc => doc.data());
      setItems(itemsInCollection);
    });
  };

  return (
    <div className="classItems">
      {items.map(item => (
        <div key={item.id}> {item.name} </div>
      ))}
    </div>
  );
};

export default Listener;
