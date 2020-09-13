import React, { useState, useEffect } from 'react';
import * as firebase from '../../lib/firebase';
import Item from '../../components/Item/Item.component';
import { Card } from '../../components/component.index.js';
import './Listener.style.scss';

const Listener = props => {
  const [localToken, setLocalToken] = useState(props.localToken);
  const [isEmpty, SetIsEmpty] = useState(true);
  const [items, setItems] = useState([]);
  const secondsInDay = 86400;
  let itemsInCollection = [];

  useEffect(() => {
    listenForUpdates();
  });

  useEffect(() => {
    // console.log(items);
  }, [items]);

  //To update the list of items when there is a change
  const listenForUpdates = () => {
    firebase.dataBase.collection(localToken).onSnapshot(snapshot => {
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

      //To sort the itemsByEstimatedDays
      let sortedItemsByEstimatedDays = itemsInCollection.slice(0);
      sortedItemsByEstimatedDays.sort((a, b) => {
        //sorts by next purchase interval
        if (a.nextPurchaseInterval > b.nextPurchaseInterval) return 1;
        if (a.nextPurchaseInterval < b.nextPurchaseInterval) return -1;

        // when initial sorting is done, sorts alphabetically. This will only sort items that
        // have the same purchase interval, hence the reason for our conditionals of > and <
        // with nextPurchaseInterval in our previous statements above!
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      });
      setItems(sortedItemsByEstimatedDays);
      if (itemsInCollection.length > 0) {
        SetIsEmpty(false);
      }
    });
  };

  return (
    <div className="lists__container">
      {isEmpty ? (
        <Card />
      ) : (
        items.map(item => (
          <Item
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
            resupplyPeriod={item.resupplyPeriod}
          ></Item>
        ))
      )}
      ;{' '}
    </div>
  );
};

export default Listener;
