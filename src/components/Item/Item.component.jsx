// React Imports
import React, { useState, useEffect } from 'react';

// Custom Imports
import calculateEstimate from '../../lib/estimates';
import * as firebase from '../../lib/firebase';
import './Item.style.scss';

// Material-UI Imports
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

const Item = props => {
  const itemId = props.id.toString();
  const secondsInDay = 86400;
  let lastPurchasedTimeInSeconds = 0;
  const itemName = props.name;
  const localToken = props.localToken;
  const over24 = props.over24;
  const resupplyPeriod = props.resupplyPeriod;
  let lastEstimate = props.lastEstimate;
  let latestInterval = props.latestInterval;
  let numberOfPurchases = props.numberOfPurchases;
  let nextPurchaseInterval = props.nextPurchaseInterval;
  let lastPurchaseDate = props.date;

  // Future implementation;  currently breaks but that's a low-priority issue.

  // const { itemName, localToken, over24, resupplyPeriod } = props;
  // let {
  //   lastEstimate,
  //   latestInterval,
  //   numberOfPurchases,
  //   nextPurchaseInterval,
  //   lastPurchaseDate,
  // } = props;

  const [dropdownLastPurchaseDate, setDropdownLastPurchaseDate] = useState(
    null,
  );

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
        (currentTimeInSeconds - lastPurchasedTimeInSeconds) / secondsInDay,
      );
    }

    // To calculate the next purchase day
    lastEstimate = nextPurchaseInterval;
    nextPurchaseInterval = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );

    // Sets date formatting for our dropdown view

    let day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const parsedDate = `${month}/${day}/${year}`;

    setDropdownLastPurchaseDate(parsedDate);

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
    <Accordion
      id={itemId}
      onClick={markPurchased}
      aria-label={`Estimated number of days till next next purchase: ${nextPurchaseInterval}`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Checkbox
          checked={!over24}
          value="checkedItem"
          inputProps={{ 'aria-label': 'Checkbox Item' }}
        />
        <Typography>{itemName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* lastPurchaseDate, Estimated number of days until purchase is made, Number of times items  has been purchased*/}

        {dropdownLastPurchaseDate}
      </AccordionDetails>
    </Accordion>
  );
};

export default Item;
