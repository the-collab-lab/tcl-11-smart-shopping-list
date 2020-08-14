import React from 'react';

import './CustomButton.style.scss';

// Allows us to have an easy to use button element and pass props for custom styling later on.
const CustomButton = ({ children }) => (
  <button className="custom__button">{children}</button>
);

export default CustomButton;
