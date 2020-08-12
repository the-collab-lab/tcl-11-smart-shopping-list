import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.style.scss';

const Footer = () => (
  <div className="footer__container">
    <NavLink
      className="footer__link"
      exact
      to="/list"
      activeClassName="footer__link--active"
    >
      List
    </NavLink>
    <NavLink
      className="footer__link"
      activeClassName="footer__link--active"
      to="/addItem"
    >
      Add an Item
    </NavLink>
  </div>
);

export default Footer;
