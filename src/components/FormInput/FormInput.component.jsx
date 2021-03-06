import React from 'react';

import './FormInput.style.scss';

const FormInput = ({ htmlFor, label, ...otherProps }) => (
  <div className="form-input__container">
    <div className="form__group">
      <label htmlFor={htmlFor} className="item__label">
        {label}:
      </label>
      <input type="text" {...otherProps} required className="form__input" />
    </div>
  </div>
);

export default FormInput;
