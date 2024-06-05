import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`footer mt-auto py-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container d-flex justify-content-center align-items-center">
        <span>
          &copy; {new Date().getFullYear()} Daniel's Site. All rights reserved. |{' '}
          <Link to="/privacy-policy" className={darkMode ? 'text-white' : 'text-dark'}>Privacy Policy</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
