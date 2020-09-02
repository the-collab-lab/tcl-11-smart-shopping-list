import React from 'react';

import './CustomButton.style.scss';

// Allows us to have an easy to use button element and pass props for custom styling later on.
const CustomButton = ({ children, large, ...otherProps }) => (
  <button
    className={`${large ? 'custom__button--large' : ''} custom__button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
