import React, { useState, useEffect } from 'react';
import * as firebase from '../Firebase/Firebase.component';
import randomString from 'randomstring';

import { FormInput, FormRadioButtons } from '../component.index';

import './AddItem.style.scss';

const AddItem = ({ newItemValue }) => {
  const [itemName, setItemName] = useState(null);
  const [resupplyPeriod, setResupplyPeriod] = useState(7);
  const [lastPurchaseDate, setLastPurchaseDate] = useState(null);
  const collectionTokenName = localStorage.getItem('token');
  const itemId = randomString.generate(20);

  //To update the value on change
  const handleChange = event => {
    setItemName(event.target.value);
  };

  const handleRadioChange = event => {
    setResupplyPeriod(event.target.value);
  };

  //To add the item to the database
  const addNewItemValue = event => {
    event.preventDefault();
    firebase.dataBase
      .collection(collectionTokenName)
      .doc(itemId)
      .set({
        name: itemName,
        resupplyPeriod: resupplyPeriod,
        id: itemId,
        lastPurchaseDate: lastPurchaseDate,
      });
    setItemName('');
  };

  useEffect(() => {
    console.log(`itemName: ${itemName}`);
  }, [itemName]);

  useEffect(() => {
    console.log(`resupplyPeriod: ${resupplyPeriod}`);
  }, [resupplyPeriod]);

  return (
    <div className="classNewItem">
      <h1 className="page__title">Add Item</h1>
      <form onSubmit={addNewItemValue} className="item__form">
        {/* <label htmlFor="itemName">Item Name: </label>
        <input
          id="itemId"
          type="text"
          value={itemName}
          name="name"
          onChange={handleChanges}
        /> */}
        <div className="item__form__wrapper">
          <FormInput
            label={'Item Name'}
            value={itemName}
            onChange={handleChange}
          />
          <FormRadioButtons handleRadioChange={handleRadioChange}>
            How soon will you buy this again?
          </FormRadioButtons>
          <br />
          <br />
          <button type="submit"> Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
