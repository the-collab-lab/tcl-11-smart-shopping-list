// React Imports
import React, { useEffect } from 'react';

// Custom Component Imports
import * as firebase from '../../lib/firebase';
import calculateEstimate from '../../lib/estimates';

// Custom Styles
import './Item.style.scss';

// Material UI Imports
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

// Add Material UI Imports for Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

  // Dialog State
  const [open, setOpen] = React.useState(false);

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

  // Open Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Close Dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Remove item from UI and database
  const deleteItem = event => {
    event.preventDefault();
    console.log('Item removed'); // TODO: Remove

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
    setOpen(false);
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

        <span onClick={handleClickOpen}>
          <DeleteIcon />
        </span>

        {/* Confirmation Dialog  */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Delete`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove {itemName} from your shopping
              list?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={deleteItem} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Item;
