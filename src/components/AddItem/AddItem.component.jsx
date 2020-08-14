import React, { useState } from 'react';
import * as firebase from '../Firebase/Firebase.component';
import randomString from 'randomstring';

import { CustomButton, FormInput, FormRadioButtons } from '../component.index';

import './AddItem.style.scss';

const AddItem = () => {
  const [itemName, setItemName] = useState(null);
  const [resupplyPeriod, setResupplyPeriod] = useState(7);
  const [lastPurchaseDate, setLastPurchaseDate] = useState(null);
  const [isAdded, setIsAdded] = useState(null);
  const collectionTokenName = localStorage.getItem('token');
  const itemId = randomString.generate(20);

  //To update the value on change
  const handleChange = event => {
    setItemName(event.target.value);
  };

  // Changes our resupply period state object based on our choice of soon, kind of soon, and not soon.
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

    // Conditionally renders tooltip after adding our item to firebase.
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);

    setItemName('');
  };

  return (
    <div className="classNewItem">
      <h1 className="page__title">Add Item</h1>
      <form onSubmit={addNewItemValue} className="item__form">
        <div className="item__form__wrapper">
          <div className="tooltip__container">
            {/*conditionally renders tooltip based on if isAdded is truthy or falsy */}
            <div
              className={`${
                isAdded ? 'tooltip--visible' : 'tooltip--invisible'
              } tooltip`}
            >
              Success! Item added.
            </div>
          </div>

          {/*Added components to make return statement neater/easier to read.*/}
          <FormInput
            label={'Item Name'}
            value={itemName}
            onChange={handleChange}
          />
          <FormRadioButtons handleRadioChange={handleRadioChange}>
            How soon will you buy this again?
          </FormRadioButtons>
          <div className="button__container">
            <CustomButton type="submit" className="add__item__button">
              Add Item
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
