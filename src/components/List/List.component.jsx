import React, { useState } from 'react';
import Listener from '../../services/Listener/Listener.service';
import { useHistory } from 'react-router-dom';
import { CustomButton } from '../component.index';

const List = () => {
  const [localToken, setLocalToken] = useState(localStorage.getItem('token'));
  const history = useHistory();
  // Redirect to the Add Item View
  const redirectAddItem = () => {
    history.push('/addItem');
  };

  return (
    <div>
      <h1 className="page__title">List</h1>
      {localToken ? (
        <>
          <Listener />
          {/* //?? Empty list displays nothing to the user */}
          <br /> <br />
          <CustomButton onClick={redirectAddItem}>Add Item</CustomButton>
        </>
      ) : (
        <>
          <div>
            <p> Your shopping list is currently empty.</p>
            <CustomButton onClick={redirectAddItem}>Add Item</CustomButton>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
