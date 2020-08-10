import React from 'react';
import getToken from '../../lib/tokens';

const List = () => {
  //Should be a button/link to create a new list

  //To generate a new token:
  const token = getToken();
  console.log('local storage: ', localStorage);

  //To set the item to the local storage
  localStorage.setItem('token', token);
  console.log('local storage: ', localStorage);
  // localStorage.removeItem('token');

  //Check if there is a saved token in the localStorage
  const localToken = localStorage.getItem('token');

  // create a token if doesn't exist
  if (localToken === null) {
    console.log('no token');
  }

  return (
    <div>
      <h1 className="page__title">List</h1>
      Should be token: {token}
    </div>
  );
};

export default List;
