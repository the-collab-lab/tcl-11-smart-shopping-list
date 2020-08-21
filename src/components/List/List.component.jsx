import React, { useState, useEffect } from 'react';
import Listener from '../../services/Listener/Listener.service';
import { useHistory } from 'react-router-dom';

const List = props => {
  console.log(props);
  const listProps = props.location.listProps;
  const token = listProps.passedToken;
  const [localToken, setLocalToken] = useState(token);

  const history = useHistory();
  // Redirect to the Add Item View
  const redirectAddItem = () => {
    history.push('/addItem', { localToken: localToken });
  };

  useEffect(() => {
    setLocalToken(token);
  }, []);

  return (
    <div>
      <h1 className="page__title">List</h1>

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
    </div>
  );
};

export default List;
