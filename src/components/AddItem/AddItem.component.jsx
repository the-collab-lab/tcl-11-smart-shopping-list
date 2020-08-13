import React, { useState } from 'react';
import * as firebase from '../Firebase/Firebase.component';

const AddItem = ({ newItemValue }) => {
  const [itemName, setItemName] = useState('');
  const collectionTokenName = localStorage.getItem('token');
  const randomString = require('randomstring');
  const itemId = randomString.generate(20);

  //To update the value on change
  const handleChanges = event => {
    setItemName(event.target.value);
  };

  //To add the item to the database
  const addNewItemValue = event => {
    firebase.dataBase
      .collection(collectionTokenName)
      .doc(itemId)
      .set({ name: itemName, id: itemId });
    setItemName('');
  };

  return (
    <div className="classNewItem">
      <h1 className="page__title">Add Item</h1>
      <form onClick={addNewItemValue}>
        <label htmlFor="itemName">Item Name: </label>
        <input
          id="itemId"
          type="text"
          value={itemName}
          name="name"
          onChange={handleChanges}
        />
        <br />
        <br />
        <button type="submit"> Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
