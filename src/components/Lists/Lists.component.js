import React from 'react';
import { Link } from 'react-router-dom';

const Lists = () => {
  const keys = Object.keys(localStorage);

  return (
    <div>
      <p>AVAILABLE LISTS:</p>

      {keys.map(key => (
        <Link to={{ pathname: '/list', state: { localToken: key } }}>
          <div> {key} </div>
        </Link>
      ))}
    </div>
  );
};

export default Lists;
