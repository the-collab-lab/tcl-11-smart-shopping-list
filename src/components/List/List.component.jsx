// React Imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Material-UI Imports
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Custom Imports
import Listener from '../../services/Listener/Listener.service';
import { Footer } from '../component.index';
import './List.style.scss';

const List = props => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
      width: '100vw',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1571211905393-6de67ff8fb61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    list: {
      backgroundColor: '#e2f3f5',
      width: '50vw',
      height: '70vh',
      alignItems: 'center',
      margin: '0 auto',
      direction: 'column',
      borderRadius: '15px',
      display: 'flex',
    },
    page: {
      margin: '0 auto',
    },
  }));

  const history = useHistory();
  const listProps = props.location.state;
  const token = listProps.localToken;
  const [localToken, setLocalToken] = useState(token);

  // Redirect to the Add Item View
  const redirectAddItem = () => {
    history.push('/addItem', { localToken: localToken });
  };

  useEffect(() => {
    setLocalToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  return (
    <Grid container component="list" className={classes.root}>
      <Grid container component="list" className={classes.list} id="list__list">
        <div className={classes.page}>
          <h1 className="page__title">Shopping List</h1>

          {localToken ? (
            <>
              <Listener localToken={localToken} />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={redirectAddItem}
              >
                Add Item
              </Button>
            </>
          ) : (
            <>
              <div>
                <p> Your shopping list is currently empty.</p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={redirectAddItem}
                >
                  Add Item
                </Button>
              </div>
            </>
          )}
          <> </>
        </div>
      </Grid>
      <Footer />
    </Grid>
  );
};

export default List;
