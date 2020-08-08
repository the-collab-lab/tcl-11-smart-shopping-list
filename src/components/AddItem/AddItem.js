import React, { useState } from 'react';
import * as firebase from '../Firebase/Firebase';

const AddItem = ({ newItemValue }) => {
  const [itemName, setItemName] = useState('');
  const collectionName = 'items';
  const randomString = require('randomstring');
  const id = randomString.generate(20);

  //To update the value on change
  const handleChanges = event => {
    setItemName(event.target.value);
  };

  //To add the item to the database
  const addNewItemValue = event => {
    firebase.dataBase
      .collection(collectionName)
      .doc(id)
      .set({ name: itemName });
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

export default AddItem;
