import React, { useState, useEffect } from 'react';
import * as firebase from '../../components/Firebase/Firebase.component';

import './Listener.style.scss';

import { CrossIcon } from '../../assets';

const Listener = () => {
  const [unfilteredItems, setUnfilteredItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const collectionTokenName = localStorage.getItem('token');
  let itemsInCollection = [];

  useEffect(() => {
    listenForUpdates();
  }, []);

  const handleChange = event => {
    setSearchData(event.target.value);
  };

  useEffect(() => {
    let unfilteredArray = [];
    unfilteredItems.forEach(unfilteredItem => {
      unfilteredArray.push(unfilteredItem.name);

      const searchFilter = unfilteredArray.filter(unfilteredArray =>
        unfilteredArray.toLowerCase().includes(searchData.toLowerCase()),
      );

      setFilteredItems(searchFilter);
    });
  }, [searchData]);

  //To update the list of items when there is a change
  const listenForUpdates = () => {
    firebase.db.collection(collectionTokenName).onSnapshot(snapshot => {
      itemsInCollection = snapshot.docs.map(doc => doc.data());
      setUnfilteredItems(itemsInCollection);
    });
  };

  const clearSearch = () => {
    setSearchData('');
  };

  return (
    <>
      <div className="search__bar">
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
      <div className="items__list">
        {searchData.length < 1 ? (
          unfilteredItems.map(item => <div key={item.id}> {item.name} </div>)
        ) : (
          <div>
            {filteredItems.map(filteredItem => (
              <div> {filteredItem} </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Listener;
