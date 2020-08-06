import React, { useState, useEffect } from 'react';
import * as firebase from './Firebase/Firebase.js';

const ItemsInput = ({ newItemValue }) => {
  const [itemName, setItemName] = useState('');
  const collectionName = 'items';
  const randomString = require('randomstring');
  const id = randomString.generate(20);

  const handleChanges = event => {
    setItemName(event.target.value);
    console.log(event.target.value);
  };

  const addNewItemValue = event => {
    firebase.dataBase
      .collection(collectionName)
      .doc(id)
      .set({ name: itemName });
    console.log(itemName, 'item was added');
    setItemName('');
  };

  return (
    <div className="classNewItem">
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

export default ItemsInput;
