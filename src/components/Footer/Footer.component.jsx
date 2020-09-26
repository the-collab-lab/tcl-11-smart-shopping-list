import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.style.scss';

const Footer = ({ addItem, localToken }) => (
  <div className="footer__container">
    <NavLink
      className="footer__link"
      exact
      to="/"
      activeClassName="footer__link--active"
    >
      Home
    </NavLink>
    {addItem ? (
      <NavLink
        className="footer__link"
        to={{ pathname: '/list', state: { localToken: localToken } }}
        activeClassName="footer__link--active"
      >
        List
      </NavLink>
    ) : null}
  </div>
);

export default Footer;
