import React, { useState, useEffect } from 'react';
import Listener from '../../services/Listener/Listener.service';

import { Footer } from '../component.index';
import { useHistory } from 'react-router-dom';

const List = props => {
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
  }, []);

  return (
    <div className="list__page">
      <h1 className="page__title">Shopping List</h1>

      {localToken ? (
        <>
          <Listener localToken={localToken} />
          <br /> <br />
          <button onClick={redirectAddItem}> Add Item</button>
        </>
      ) : (
        <>
          <div>
            <p> Your shopping list is currently empty.</p>
            <button onClick={redirectAddItem}> Add Item</button>
          </div>
        </>
      )}
      <> </>
      <Footer />
    </div>
  );
};

export default List;
