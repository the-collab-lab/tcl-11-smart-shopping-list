import React, { useEffect } from 'react';
import * as firebase from '../../lib/firebase';
import calculateEstimate from '../../lib/estimates';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import './Item.style.scss';

const Item = props => {
  const itemName = props.name;
  const itemId = props.id.toString();
  const localToken = props.localToken;
  const over24 = props.over24;
  const resupplyPeriod = props.resupplyPeriod;
  let lastEstimate = props.lastEstimate;
  let latestInterval = props.latestInterval;
  let numberOfPurchases = props.numberOfPurchases;
  let nextPurchaseInterval = props.nextPurchaseInterval;
  let lastPurchaseDate = props.date;
  let lastPurchasedTimeInSeconds = 0;

  // To update the purchase date
  const markPurchased = event => {
    event.preventDefault();
    const date = new Date();

    // To update the number of purchases
    numberOfPurchases += 1;

    // To update the latest interval
    if (lastPurchaseDate === null) {
      latestInterval = 0;
    } else {
      let currentTimeInSeconds = new Date().getTime() / 1000;
      lastPurchasedTimeInSeconds = lastPurchaseDate.seconds;
      latestInterval = Math.ceil(
        (currentTimeInSeconds - lastPurchasedTimeInSeconds) / 86400,
      ); // There are 86400 seconds in a 24 hour day
    }

    // To calculate the next purchase day
    lastEstimate = nextPurchaseInterval;
    nextPurchaseInterval = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );

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
              .update({
                lastPurchaseDate: date,
                numberOfPurchases: numberOfPurchases,
                nextPurchaseInterval: nextPurchaseInterval,
                latestInterval: latestInterval,
                lastEstimate: lastEstimate,
              });
          }
        });
      });
  };

  // Remove item from UI and database
  const deleteItem = event => {
    event.preventDefault();
    console.log('hi');

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
              .delete();
          }
        });
      });
  };

  useEffect(() => {
    if (over24 === false) {
      document.getElementById(itemId).style.textDecoration = 'line-through';
    }
    // To highlight the items based on resupplyPeriod
    if (resupplyPeriod === 7) {
      document.getElementById(itemId).setAttribute('class', 'list__item--soon');
      return;
    } else if (resupplyPeriod === 14) {
      document
        .getElementById(itemId)
        .setAttribute('class', 'list__item--kind-of-soon');
      return;
    } else if (resupplyPeriod === 30) {
      document
        .getElementById(itemId)
        .setAttribute('class', 'list__item--not-soon');
      return;
    } else if (
      numberOfPurchases < 2 ||
      lastPurchasedTimeInSeconds > 2 * nextPurchaseInterval
    ) {
      document
        .getElementById(itemId)
        .setAttribute('class', 'list__item--inactive');
    }
  });

  return (
    <>
      <div
        id={itemId}
        aria-label={`Estimated number of days till next next purchase: ${nextPurchaseInterval}`}
      >
        <Checkbox
          checked={!over24}
          onClick={markPurchased}
          value="checkedItem"
          inputProps={{ 'aria-label': 'Checkbox Item' }}
        />
        {itemName}

        <span onClick={deleteItem}>
          <DeleteIcon />
        </span>
      </div>
    </>
  );
};

export default Item;
