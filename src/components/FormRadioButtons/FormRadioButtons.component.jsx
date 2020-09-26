import React from 'react';

import './FormRadioButtons.style.scss';

const FormRadioButtons = ({ children, handleRadioChange }) => (
  // Go accessibility!  The fieldset tag uses a <legend> tag to provide a description for the grouping.
  // This helps with screen readers.
  <fieldset className="form__fieldset">
    <legend className="form__legend">{children}</legend>
    <div className="form__container">
      <input
        type="radio"
        name="soon"
        value={7}
        id="soon"
        defaultChecked
        onChange={handleRadioChange}
        className="form__radio"
      />
      <label htmlFor="soon" className="form__label form__label--soon">
        Soon
      </label>
      <input
        type="radio"
        name="soon"
        value={14}
        id="kind-of-soon"
        onChange={handleRadioChange}
        className="form__radio"
      />
      <label
        htmlFor="kind-of-soon"
        className="form__label form__label--kind-of-soon"
      >
        Kind of Soon
      </label>

      <input
        type="radio"
        name="soon"
        value={30}
        id="not-soon"
        onChange={handleRadioChange}
        className="form__radio"
      />
      <label htmlFor="not-soon" className="form__label form__label--not-soon">
        Not Soon
      </label>
    </div>
  </fieldset>
);

export default FormRadioButtons;
