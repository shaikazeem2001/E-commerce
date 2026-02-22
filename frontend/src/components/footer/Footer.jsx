import React from 'react';
import './Footer.css';
import footer_logo from '../assets/logo_big.png';
import instagram_icon from '../assets/instagram_icon.png';
import pinterest_icon from '../assets/pintester_icon.png';
import whatsapp_icon from '../assets/whatsapp_icon.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <img src={footer_logo} alt="Trend Logo" />
          <p>Trend</p>
        </div>

        <ul className="footer-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/offices">Offices</Link></li>
        </ul>

        <div className="footer-social-icons">
          <div className="footer-icons-container">
            <img src={instagram_icon} alt="Instagram" />
          </div>
          <div className="footer-icons-container">
            <img src={pinterest_icon} alt="Pinterest" />
          </div>
          <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="WhatsApp" />
          </div>
        </div>

        <div className="footer-copyright">
          <hr />
          <p>Copyright © 2026 - All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
