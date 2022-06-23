import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer data-testid="footer">
    <button type="button">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src="xx"
          alt="xxx"
        />
      </Link>
    </button>

    <button type="button">
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          src="xx"
          alt="xxx"
        />
      </Link>
    </button>

    <button type="button">
      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          src="xx"
          alt="xxx"
        />
      </Link>
    </button>

  </footer>
);

export default Footer;
