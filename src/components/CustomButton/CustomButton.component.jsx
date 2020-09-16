import React from 'react';

import './CustomButton.style.scss';

// Allows us to have an easy to use button element and pass props for custom styling later on.

// I Accepted current change here, didn't see an issue, but made my comment for
// accountability in case something breaks - Brandon

const CustomButton = ({ children, large, ...otherProps }) => (
  <button
    className={`${large ? 'custom__button--large' : ''} custom__button`}
    {...otherProps}
  >
    {children}
  </button>
);

// This is the original (yet not completely functional) CustomButton

// const CustomButton = ({ children }) => (
//   <button className="custom__button">{children}</button>
// );

export default CustomButton;
