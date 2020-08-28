import React, { useState, useEffect } from 'react';
import * as firebase from '../../components/Firebase/Firebase.component';
import Item from '../../components/Item/Item.component';

const Listener = props => {
  const [localToken, setLocalToken] = useState(props.localToken);
  const [items, setItems] = useState([]);
  let itemsInCollection = [];

  useEffect(() => {
    listenForUpdates();
  });

  //To update the list of items when there is a change
  const listenForUpdates = () => {
    firebase.dataBase.collection(localToken).onSnapshot(snapshot => {
      itemsInCollection = snapshot.docs.map(doc => doc.data());
      setItems(itemsInCollection);
    });
  };

  return (
    <div className="lists__container">
      {items.map(item => (
        // <div key={item.id}> {item.name} </div>
        <Item
          key={item.id}
          name={item.name}
          id={item.id}
          date={item.lastPurchaseDate}
          localToken={localToken}
        >
          {' '}
        </Item>
      ))}
      {/* <Item/> */}
    </div>
  );
};

export default Listener;
