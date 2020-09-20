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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

const Item = props => {
  const itemId = props.id.toString();
  const secondsInDay = 86400;
  let lastPurchasedTimeInSeconds = props.purchasedTimeInSeconds;
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

  // Variable set up for easy theming whenever we want to get rid of these LOVELY colours LUL
  let accordionColor;
  const soon = 7;
  const kindOfSoon = 14;

  // Switch statement which looks for the resupply period  to match:
  // soon (7), kind of soon (14), and not soon (30).
  switch (resupplyPeriod) {
    case soon:
      accordionColor = 'yellow';
      break;

    case kindOfSoon:
      accordionColor = 'red';
      break;

    default:
      accordionColor = 'green';
  }

  //Secondary Switch statement which looks for if items in list are inactive or not.
  // Since user simulates purchase by clicking on checkbox, user should click twice to get assigned a new colour,
  // As it will (correctly) default to purple. Speaking of 'default', I set the default statement as 'break' here
  // purposefully. The 'correct' approach would have been to not use a switch statement for this case, but I wanted
  // To keep the approach of theming similar for ease of developer customization: simply change accordionColor below
  // to change...the accordionColor.

  switch (
    numberOfPurchases < 2 ||
    lastPurchasedTimeInSeconds > 2 * nextPurchaseInterval
  ) {
    case true:
      accordionColor = 'purple';
      break;

    default:
      break;
  }

  return (
    <Accordion
      style={{ background: `${accordionColor}` }}
      aria-label={`Estimated number of days till next next purchase: ${nextPurchaseInterval}`}
      className={`${resupplyPeriod === 7 ? 'list__item--soon' : ''}`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Checkbox
          onClick={markPurchased}
          checked={!over24}
          value="checkedItem"
          inputProps={{ 'aria-label': 'Checkbox Item' }}
        />
        <span
          id="item__name"
          style={{ textDecoration: !over24 ? 'line-through' : 'none' }}
        >
          {itemName}
        </span>
      </AccordionSummary>
      <AccordionDetails className="accordion__details">
        <div className="flex-container">
          {dropdownLastPurchaseDate
            ? `Last Purchase Date: ${dropdownLastPurchaseDate}`
            : "This item hasn't been purchased yet :("}
        </div>
        <div>
          {' '}
          {`Estimated number of days until next purchase: ${nextPurchaseInterval}`}
        </div>
        <div> {`Number of times purchased: ${numberOfPurchases}`}</div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Item;
