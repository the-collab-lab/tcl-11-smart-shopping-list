import React, { useState, useEffect } from 'react';
import * as firebase from '../../lib/firebase';
import { Card } from '../../components/component.index.js';
import Item from '../../components/Item/Item.component';

import './Listener.style.scss';

const Listener = (localToken) => {
  const [items, setItems] = useState([]);
  const [isEmpty, SetIsEmpty] = useState(true);
  const collectionTokenName = localStorage.getItem('token');
  const secondsInDay = 86400;
  let itemsInCollection = [];

  useEffect(() => {
    listenForUpdates();
  }, []);

  //To update the list of items when there is a change
  const listenForUpdates = () => {
    firebase.dataBase.collection(collectionTokenName).onSnapshot(snapshot => {
      itemsInCollection = snapshot.docs.map(doc => doc.data());

      //To check if there has been 24 hours
      itemsInCollection.forEach((item, index) => {
        //Was marked as purchased before
        if (item.lastPurchaseDate !== null) { 
          let currentTimeInSeconds = new Date().getTime() / 1000;
          let lastPurchasedTimeInSeconds = item.lastPurchaseDate.seconds;
          let timeDifference =
            currentTimeInSeconds - lastPurchasedTimeInSeconds;

          //Item was purchased over 24 hours ago
          if (timeDifference >= secondsInDay) {
            itemsInCollection[index] = {
              ...itemsInCollection[index],
              over24: true,
            };
          }
          //Item was purchased less than 24 hours ago
          else {
            itemsInCollection[index] = {
              ...itemsInCollection[index],
              over24: false,
            };
          }

          //Was not marked as purchased before
        } else {
          itemsInCollection[index] = {
            ...itemsInCollection[index],
            over24: 'none',
          };
        }
      });
      setItems(itemsInCollection);

      if (itemsInCollection.length > 0) {
        SetIsEmpty(false);
      }
    });
  };

  return (
    <div className="listener__container">
      {isEmpty ? (
        <Card />
      ) : (
        items.map(item =><Item
          key={item.id}
          name={item.name}
          id={item.id}
          date={item.lastPurchaseDate}
          localToken={localToken}
          over24={item.over24}
          lastEstimate={item.lastEstimate}
          latestInterval={item.latestInterval}
          numberOfPurchases={item.numberOfPurchases}
          nextPurchaseInterval={item.nextPurchaseInterval}
        ></Item>)
      )}
    </div>
  );
};

export default Listener;
