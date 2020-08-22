import React from 'react';
import { Link } from 'react-router-dom';

import './Lists.style.scss';

const Lists = () => {
  const keys = Object.keys(localStorage);

  return (
    <div>
      <p className="lists__header">Available Lists:</p>

      {keys.map(key => (
        <Link
          className="lists__link"
          to={{ pathname: '/list', state: { localToken: key } }}
        >
          <div> {key} </div>
        </Link>
      ))}
    </div>
  );
};

export default Lists;
