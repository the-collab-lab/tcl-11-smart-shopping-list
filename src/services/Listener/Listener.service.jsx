/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// React Imports
import React, { useState, useEffect } from 'react';

// Material-UI Imports

// Custom Imports
import * as firebase from '../../lib/firebase';
import { Card, Item } from '../../components/component.index.js';
import { CrossIcon } from '../../assets';
import './Listener.style.scss';

const Listener = props => {
  const [filteredItems, setFilteredItems] = useState([]);
  let itemsInCollection = [];
  const [items, setItems] = useState([]);
  const [isEmpty, SetIsEmpty] = useState(true);
  const [localToken, SetLocalToken] = useState(props.localToken);
  const [searchData, setSearchData] = useState([]);
  const [unfilteredItems, setUnfilteredItems] = useState([]);
  const preview = props.preview;
  const secondsInDay = 86400;

  useEffect(() => {
    listenForUpdates();
  }, []);

  useEffect(() => {
    let unfilteredArray = [];
    unfilteredItems.forEach(unfilteredItem => {
      unfilteredArray.push(unfilteredItem);

      for (const shopItem of unfilteredArray) {
        const searchFilter = unfilteredArray.filter(unfilteredArray =>
          unfilteredArray.name.toLowerCase().includes(searchData.toLowerCase()),
        );
        setFilteredItems(searchFilter);
      }
    });
  }, [searchData]);

  const handleChange = event => {
    setSearchData(event.target.value);
  };

  const clearSearch = () => {
    setSearchData('');
  };

  //To update the list of items when there is a change
  const listenForUpdates = () => {
    firebase.dataBase.collection(localToken).onSnapshot(snapshot => {
      itemsInCollection = snapshot.docs.map(doc => doc.data());
      setUnfilteredItems(itemsInCollection);

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
      // eslint-disable-next-line array-callback-return
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
      setUnfilteredItems(itemsInCollection);

      if (itemsInCollection.length > 0) {
        SetIsEmpty(false);
      }
    });
  };

  return (
    <>
      <div className="listener__container">{isEmpty ? <Card /> : null}</div>
      <div className="search__container">
        <div className={`${preview ? 'search__preview' : ''} search__bar`}>
          <input
            type="text"
            className="search__input"
            placeholder="Search..."
            value={searchData}
            onChange={handleChange}
          />

          <CrossIcon
            className={`${
              searchData.length ? '' : 'search__icon--invisible'
            } search__icon`}
            onClick={clearSearch}
          />
        </div>
      </div>

      <div className={`${preview ? 'items__preview' : ''} items__list`}>
        {searchData.length < 1 ? (
          unfilteredItems.map(item => (
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
        ) : (
          <div className={`${preview ? 'items__preview' : ''} items__list`}>
            {filteredItems.map(filteredItem => (
              <Item
                key={filteredItem.id}
                name={filteredItem.name}
                id={filteredItem.id}
                date={filteredItem.lastPurchaseDate}
                localToken={localToken}
                over24={filteredItem.over24}
                lastEstimate={filteredItem.lastEstimate}
                latestInterval={filteredItem.latestInterval}
                numberOfPurchases={filteredItem.numberOfPurchases}
                nextPurchaseInterval={filteredItem.nextPurchaseInterval}
                resupplyPeriod={filteredItem.resupplyPeriod}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Listener;
