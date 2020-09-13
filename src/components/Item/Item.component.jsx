import React, { useEffect } from 'react';
import 'firebase/firestore';
import * as firebase from '../../lib/firebase';
import calculateEstimate from '../../lib/estimates';
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

  useEffect(() => {
    if (over24 === false) {
      document.getElementById(itemId).setAttribute('class', 'item__highlight');
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
    } else {
      // do inactive stuffs
      document
        .getElementById(itemId)
        .setAttribute('class', 'list__item--inactive');
    }
  });

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
      let lastPurchasedTimeInSeconds = lastPurchaseDate.seconds;
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

    // TODO: work out what constitutes an item as 'inactive'.
    // Check out item properties: `numberOfPurchases` and `estimatedPurchase date etc.
    // see issue for more details`
    // Inactive (when there’s only 1 purchase in the database or the purchase is really out of date [the time that has elapsed since the last purchase is 2x what was estimated])

    //     }

    //aria-label='Item needed soon'

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

  return (
    <div id={itemId} onClick={markPurchased}>
      <Checkbox
        checked={!over24}
        value="checkedItem"
        inputProps={{ 'aria-label': 'Checkbox Item' }}
      />
      {itemName}
    </div>
  );
};

export default Item;
