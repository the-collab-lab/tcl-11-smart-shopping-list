import React, { useState, useEffect } from 'react';
import * as firebase from '../../components/Firebase/Firebase.component';
import { Card } from '../../components/component.index.js';

const Listener = () => {
  const [items, setItems] = useState([]);
  const [isEmpty, SetIsEmpty] = useState(true);
  const collectionTokenName = localStorage.getItem('token');
  let itemsInCollection = [];

  useEffect(() => {
    listenForUpdates();
  }, []);

  //To update the list of items when there is a change
  const listenForUpdates = () => {
    firebase.dataBase.collection(collectionTokenName).onSnapshot(snapshot => {
      itemsInCollection = snapshot.docs.map(doc => doc.data());
      setItems(itemsInCollection);

      if (itemsInCollection.length > 0) {
        SetIsEmpty(false);
      }
    });
  };

  return (
    <div className="classItems">
      {isEmpty ? (
        <Card />
      ) : (
        items.map(item => <div key={item.id}> {item.name} </div>)
      )}
    </div>
  );
};

export default Listener;
