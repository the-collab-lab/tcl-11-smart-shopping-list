import React from 'react';

import './Card.style.scss';
const Card = () => (
  <div className="card__container">
    <div className="text__container">
      <h3 className="card__title">
        Your shopping list is empty
        <span role="img" aria-label="A crying emoji" className="card__emoji">
          😭
        </span>
      </h3>
      <div className="card__subtitle">
        Please click the add item button below.
      </div>
    </div>
  </div>
);

export default Card;
