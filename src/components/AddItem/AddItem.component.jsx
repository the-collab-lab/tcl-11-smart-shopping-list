import React, { useState } from 'react';
import * as firebase from '../../lib/firebase';
import randomString from 'randomstring';

import { Footer, FormInput, FormRadioButtons } from '../component.index';
import Listener from '../../services/Listener/Listener.service';

import {
  Backdrop,
  Button,
  Fade,
  IconButton,
  makeStyles,
  Modal,
  Tooltip,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import './AddItem.style.scss';

const AddItem = props => {
  // eslint-disable-next-line no-unused-vars
  const [collectionTokenName, setCollectionTokenName] = useState(
    props.location.state.localToken,
  );
  const [isAdded, setIsAdded] = useState(null);
  const [itemName, setItemName] = useState(null);
  const lastPurchaseDate = null;
  const lastEstimate = 0;
  const latestInterval = 0;
  const nextPurchaseInterval = 0;
  const numberOfPurchases = 0;
  const [resupplyPeriod, setResupplyPeriod] = useState(7);
  const itemId = randomString.generate(20);

  const useStyles = makeStyles(theme => ({
    submit: {
      margin: theme.spacing(1, 0, 2),
    },
  }));

  //Material UI specific state and variables
  const [open, setOpen] = useState(false);

  //To update the value on change
  const handleChange = event => {
    setItemName(event.target.value);
  };

  // Changes our resupply period state object based on our choice of soon, kind of soon, and not soon.
  const handleRadioChange = event => {
    setResupplyPeriod(parseInt(event.target.value));
  };

  //To add the item to the database
  const addNewItemValue = event => {
    event.preventDefault();

    // The root of this merge conflict; firebase.db reverted to original firebase.dataBase
    // firebase.db
    // Clean Input to remove capitalization, punctuation, and spaces

    const cleanInput = itemName
      .toLowerCase()
      .replace(/[^\w\s]|/g, '')
      .replace(/[\s]/, '');

    firebase.dataBase
      .collection(collectionTokenName)
      .get()
      .then(snapshot => {
        const items = snapshot.docs

          .map(query => query.data())
          .map(data =>
            data.name
              .toLowerCase()
              .replace(/[^\w\s]|/g, '')
              .replace(/[\s]/, ''),
          );

        if (!items.includes(cleanInput)) {
          setIsAdded(true);
          setTimeout(() => {
            setIsAdded(false);
          }, 1200);

          setItemName('');
          return firebase.dataBase.collection(collectionTokenName).add({
            name: itemName,
            resupplyPeriod: resupplyPeriod,
            id: itemId,
            lastPurchaseDate: lastPurchaseDate,
            lastEstimate: lastEstimate,
            latestInterval: latestInterval,
            numberOfPurchases: numberOfPurchases,
            nextPurchaseInterval: nextPurchaseInterval,
          });
        } else {
          alert('already exists');
        }
      });
  };

  // Handles modal opening and closing

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className="page__container">
      <div className="page__content">
        <h1 className="page__title">Add Item</h1>
        <Tooltip title="View List!" onClick={handleOpen}>
          <IconButton aria-label="View list">
            <AssignmentIcon id="list__icon" />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          className="list__modal"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="list__card">
              {' '}
              <Listener localToken={collectionTokenName} preview={true} />
            </div>
          </Fade>
        </Modal>

        <form onSubmit={addNewItemValue} className="item__form">
          <div className="item__form__wrapper">
            <div className="tooltip__container">
              {/*conditionally renders tooltip based on if isAdded is truthy or falsy */}
              <div
                className={`${
                  isAdded ? 'tooltip--visible' : 'tooltip--invisible'
                } tooltip`}
              >
                Success! Item added.
              </div>
            </div>

            <FormInput
              label={'Item Name'}
              value={itemName}
              onChange={handleChange}
            />
            <FormRadioButtons handleRadioChange={handleRadioChange}>
              How soon will you buy this again?
            </FormRadioButtons>
            <div className="button__container">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
              >
                Add Item
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Footer addItem={true} localToken={collectionTokenName} />
    </div>
  );
};

export default AddItem;
