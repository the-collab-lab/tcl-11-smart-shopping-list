import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.style.scss';

const Footer = () => (
  <div className="footer__container">
    <NavLink
      className="footer__link"
      exact
      to="/"
      activeClassName="footer__link--active"
    >
      Home
    </NavLink>
  </div>
);

export default Footer;
