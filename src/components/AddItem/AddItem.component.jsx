import React, { useState } from 'react';
import * as firebase from '../../lib/firebase';
import randomString from 'randomstring';

import {
  CustomButton,
  Footer,
  FormInput,
  FormRadioButtons,
} from '../component.index';
import Listener from '../../services/Listener/Listener.service';

import './AddItem.style.scss';

const AddItem = props => {
  const [itemName, setItemName] = useState(null);
  const [resupplyPeriod, setResupplyPeriod] = useState(7);
  const [lastPurchaseDate, setLastPurchaseDate] = useState(null);
  const [isAdded, setIsAdded] = useState(null);
  const [collectionTokenName, setCollectionName] = useState(
    props.location.state.localToken,
  );
  const itemId = randomString.generate(20);

  //To update the value on change
  const handleChange = event => {
    setItemName(event.target.value);
  };

  // Changes our resupply period state object based on our choice of soon, kind of soon, and not soon.
  const handleRadioChange = event => {
    setResupplyPeriod(parseInt(event.target.value));
  };

  //To add the item to the database
  const addNewItemValue = event => {
    event.preventDefault();

    // Clean Input
    const cleanInput = itemName.toLowerCase().replace(/[^\w\s]|/g, '');

    firebase.dataBase
      .collection(collectionTokenName)
      .get()
      .then(snapshot => {
        const items = snapshot.docs

          .map(query => query.data())
          .map(data => data.name.toLowerCase().replace(/[^\w\s]|/g, ''));

        console.log('items from add item:', items);

        if (!items.includes(cleanInput)) {
          return firebase.dataBase.collection(collectionTokenName).add({
            name: itemName,
            resupplyPeriod: resupplyPeriod,
            id: itemId,
            lastPurchaseDate: lastPurchaseDate,
          });
          setIsAdded(true);
          setTimeout(() => {
            setIsAdded(false);
          }, 1200);
        } else {
          alert('already exists');
        }
      });
  };

  return (
    <div className="classNewItem">
      <h1 className="page__title">Add Item</h1>
      <Listener localToken={collectionTokenName} />
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
      <Footer />
    </div>
  );
};

export default AddItem;
