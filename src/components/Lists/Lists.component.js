import React from 'react';
import { Link, Route } from 'react-router-dom';

const Lists = () => {
  const keys = Object.keys(localStorage);

  return (
    //         <div>
    //         <p>AVAILABLE LISTS:</p>

    //         {keys.map(key => (
    //             <Link to="/list">

    //                 <div key={key}> {key} </div>
    //             </Link>
    //   ))}
    //       </div>

    <div>
      <p>AVAILABLE LISTS:</p>

      {keys.map(key => (
        <Link to={{ pathname: '/list', listProps: { passedToken: key } }}>
          <div> {key} </div>
        </Link>
      ))}
    </div>
  );
};

export default Lists;
