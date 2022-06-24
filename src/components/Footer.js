import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <footer
    className="footer-container"
    data-testid="footer"
  >
    <button
      className="drinks-btn"
      type="button"
    >
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="btm drinks" />
      </Link>
    </button>

    <button
      className="explore-btn"
      type="button"
    >
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="btn explore"
        />
      </Link>
    </button>

    <button
      className="foods-btn"
      type="button"
    >
      <Link to="/foods">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="btn food" />
      </Link>
    </button>
  </footer>
);

export default Footer;
