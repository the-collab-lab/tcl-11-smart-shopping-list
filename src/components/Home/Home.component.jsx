import React, { useState, useEffect } from 'react';
import * as firebase from '../../lib/firebase';
import { useHistory } from 'react-router-dom';
import { Lists } from '../component.index';
import './Home.style.scss';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Home = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
      width: '100vw',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/9m2RZvHS_cU)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  // eslint-disable-next-line no-unused-vars
  const [localToken, setLocalToken] = useState('');
  const [tokenValue, setTokenValue] = useState('');

  const history = useHistory();

  const joinExistingList = async () => {
    let tokenRef = firebase.dataBase.collection(`${tokenValue}`);
    let snapshot = await tokenRef.get();

    if (snapshot.empty) {
      alert(
        "Sorry, this collection doesn't exist. Please try again or create a new list.",
      );
    } else {
      addTokenToStorage(tokenValue);
      history.push('/');
    }
  };

  const generateToken = () => {
    //To generate a new token:
    // const token = getToken();
    // setLocalToken(token);

    // //To set the item to the local storage
    // addTokenToStorage(token);

    // // To go to addItem page
    // history.push('/list', { localToken: token });
    console.log('This feature is no longer supported.');
  };

  //To add the token to the storage
  const addTokenToStorage = token => {
    //To set the item to the local storage
    localStorage.setItem(token, token);
  };

  // Dynamically sets our tokenValue based on our FormInput's value
  const onChange = event => {
    setTokenValue(event.target.value);
  };

  const classes = useStyles();

  /** Using this alert instead of the ArchivalNoticeModal due to legacy deps */
  useEffect(() => {
    alert(
      'This Smart Shopping List App was made by early-career developers at The Collab Lab. This project has now been archived. To view the demo shopping list, enter the three word token: the collab lab. The following features are no longer supported: creating new lists, adding & deleting items from the list, and marking items on the list as purchased.',
    );
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            Welcome to your Smart Shopping List
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={generateToken}
          >
            Create a New Shopping List
          </Button>

          <Typography component="h1" variant="h5">
            Join an existing shopping list by entering a three word token.
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              onChange={onChange}
              label={'Share Token'}
              value={tokenValue}
            />
          </form>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={joinExistingList}
          >
            Add a Token
          </Button>

          <Typography component="h1" variant="h5">
            Click on the token to select the list you want to edit:
          </Typography>

          <Typography component="h1" variant="h5">
            <Lists />
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
