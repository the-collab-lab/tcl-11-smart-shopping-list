import React, { useState } from 'react';
import * as firebase from '../Firebase/Firebase.component';

const AddItem = ({ newItemValue }) => {
  const [itemName, setItemName] = useState('');
  // const collectionName = 'items';
  const collectionName = localStorage.getItem('token');
  const randomString = require('randomstring');
  const itemId = randomString.generate(20);

  //To update the value on change
  const handleChanges = event => {
    setItemName(event.target.value);
  };

  //To add the item to the database
  const addNewItemValue = event => {
    firebase.dataBase
      .collection(collectionName)
      .doc(itemId)
      .set({ name: itemName, id: itemId });
    setItemName('');
  };

  return (
    <div className="classNewItem">
      <h1 className="page__title">Add Item</h1>
      <input
        id="itemId"
        value={itemName}
        name="name"
        onChange={handleChanges}
      />

      <button onClick={addNewItemValue}> Add Item</button>
    </div>
  );
};

export default AddItem;
