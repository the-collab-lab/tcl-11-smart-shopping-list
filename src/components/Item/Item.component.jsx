import React from 'react';
import 'firebase/firestore';
import * as firebase from '../../components/Firebase/Firebase.component';
import Checkbox from '@material-ui/core/Checkbox';
import './Item.style.scss';

const Item = props => {
  const itemName = props.name;
  const itemId = props.id.toString();
  const localToken = props.localToken;

  //To update the purchase date
  const markPurchased = event => {
    event.preventDefault();
    const date = new Date();

    document.getElementById(itemId).setAttribute('class', 'highlight');

    firebase.dataBase
      .collection(localToken)

      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().id === itemId) {
            const documentId = doc.id;
            firebase.dataBase
              .collection(localToken)
              .doc(documentId)
              .update({ lastPurchaseDate: date });
          }
        });
      });
  };

  return (
    <div id={itemId} onClick={markPurchased}>
      <Checkbox
        value="checkedItem"
        inputProps={{ 'aria-label': 'Checkbox Item' }}
      />

      {itemName}
    </div>
  );
};

export default Item;
